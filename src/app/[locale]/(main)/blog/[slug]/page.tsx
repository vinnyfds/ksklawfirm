import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Card, CardContent } from '@/components/ui/Card';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { prisma } from '@/lib/db';

type Props = {
  params: Promise<{
    slug: string;
    locale: string;
  }>;
};

/**
 * Helper function to calculate reading time
 */
function calculateReadingTime(content: string, minReadText: string): string {
  if (!content) return `1 ${minReadText}`;
  const text = content.replace(/<[^>]*>/g, '').trim();
  const wordCount = text.split(/\s+/).filter((word) => word.length > 0).length;
  const minutes = Math.ceil(wordCount / 200);
  return `${minutes} ${minReadText}`;
}

async function getBlogPost(slug: string, minReadText: string) {
  try {
    const post = await prisma.content.findFirst({
      where: {
        slug,
        type: 'BLOG_POST',
        isPublished: true,
      },
    });

    if (!post) {
      return null;
    }

    return {
      id: post.id,
      slug: post.slug,
      title: post.title,
      content: post.content,
      category: 'Legal', // Default category
      publishedAt: post.publishedAt?.toISOString() || post.createdAt.toISOString(),
      readingTime: calculateReadingTime(post.content, minReadText),
    };
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug, locale } = await params;
  setRequestLocale(locale);
  
  const t = await getTranslations('articles');
  const tNav = await getTranslations('nav');
  const tServices = await getTranslations('services');
  
  const post = await getBlogPost(slug, t('minRead'));

  if (!post) {
    notFound();
  }

  // Category mapping: English category name -> translation key
  const categoryMap: Record<string, string> = {
    'Ancestral Properties': 'ancestralProperties.title',
    'Divorce': 'divorce.title',
    'Property Litigation': 'propertyLitigation.title',
    'Civil Matters': 'civilMatters.title',
    'Criminal Matters': 'criminalMatters.title',
  };

  const getCategoryLabel = (category: string): string => {
    const translationKey = categoryMap[category];
    return translationKey ? tServices(translationKey) : category;
  };

  const breadcrumbs = [
    { label: tNav('home'), href: '/' },
    { label: tNav('blog'), href: '/blog' },
    { label: post.title, href: `/blog/${post.slug}` },
  ];

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="max-w-4xl mx-auto">
        <Breadcrumbs items={breadcrumbs} />
        
        <h1 className="text-h1 font-serif font-bold text-brand-primary mb-4">
          {post.title}
        </h1>
        <div className="flex items-center gap-4 mb-8 text-body-sm text-text-secondary dark:text-dark-text-secondary">
          <span>{getCategoryLabel(post.category)}</span>
          <span>•</span>
          <span>
            {new Date(post.publishedAt).toLocaleDateString(locale, {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>
          <span>•</span>
          <span>{post.readingTime}</span>
        </div>

        <Card className="mb-8">
          <CardContent className="p-8">
            <div 
              className="prose prose-lg max-w-none dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
