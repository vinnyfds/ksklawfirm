import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { prisma } from '@/lib/db';
import { Link } from '@/lib/navigation';
import { generateSEOMetadata, getBaseUrl } from '@/lib/seo';
import { Metadata } from 'next';

type Props = {
  params: Promise<{
    slug: string;
    locale: string;
  }>;
};

/**
 * Helper function to extract outcome from content
 */
function extractOutcome(content: string): string {
  if (!content) return '';
  const text = content.replace(/<[^>]*>/g, '');
  const outcomeMatch = text.match(/(?:outcome|result|conclusion)[:\-]?\s*(.+?)(?:\.|$)/i);
  if (outcomeMatch && outcomeMatch[1]) {
    return outcomeMatch[1].trim();
  }
  return '';
}

async function getCaseStudy(slug: string) {
  try {
    const caseStudy = await prisma.content.findFirst({
      where: {
        slug,
        type: 'CASE_STUDY',
        isPublished: true,
      },
    });

    if (!caseStudy) {
      return null;
    }

    return {
      id: caseStudy.id,
      slug: caseStudy.slug,
      title: caseStudy.title,
      content: caseStudy.content,
      category: 'Legal', // Default category
      outcome: extractOutcome(caseStudy.content) || 'Case successfully resolved',
      publishedAt: caseStudy.publishedAt?.toISOString() || caseStudy.createdAt.toISOString(),
      excerpt: caseStudy.content.replace(/<[^>]*>/g, '').substring(0, 160),
    };
  } catch (error) {
    console.error('Error fetching case study:', error);
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;
  const baseUrl = getBaseUrl();
  const caseStudy = await getCaseStudy(slug);

  if (!caseStudy) {
    return generateSEOMetadata(
      {
        title: 'Case Study | KSK Law Firm',
        description: 'Read about our successful legal cases for NRIs.',
        canonical: `${baseUrl}/${locale}/case-studies/${slug}`,
        locale,
      },
      baseUrl
    );
  }

  return generateSEOMetadata(
    {
      title: `${caseStudy.title} | KSK Law Firm Case Study`,
      description: caseStudy.excerpt || 'Read about our successful legal cases for NRIs.',
      canonical: `${baseUrl}/${locale}/case-studies/${caseStudy.slug}`,
      locale,
      ogType: 'article',
    },
    baseUrl
  );
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug, locale } = await params;
  setRequestLocale(locale);
  
  const t = await getTranslations('caseStudies');
  const tNav = await getTranslations('nav');
  const tCommon = await getTranslations('common');
  const tServices = await getTranslations('services');
  
  const caseStudy = await getCaseStudy(slug);

  if (!caseStudy) {
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
    { label: t('pageTitle'), href: '/case-studies' },
    { label: caseStudy.title, href: `/case-studies/${caseStudy.slug}` },
  ];

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="max-w-4xl mx-auto">
        <Breadcrumbs items={breadcrumbs} />
        
        <h1 className="text-h1 font-serif font-bold text-brand-primary mb-4">
          {caseStudy.title}
        </h1>
        <div className="flex items-center gap-4 mb-8 text-body-sm text-text-secondary dark:text-dark-text-secondary">
          <span>{getCategoryLabel(caseStudy.category)}</span>
          <span>•</span>
          <span>
            {new Date(caseStudy.publishedAt).toLocaleDateString(locale, {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>
        </div>

        <Card className="mb-8">
          <CardContent className="p-8">
            <div 
              className="prose prose-lg max-w-none dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: caseStudy.content }}
            />
          </CardContent>
        </Card>

        {caseStudy.outcome && (
          <Card className="bg-brand-primary/5 dark:bg-brand-primary/10 mb-8">
            <CardContent className="p-6">
              <h2 className="text-h3 font-serif font-bold text-brand-primary mb-2">{t('outcome')}</h2>
              <p className="text-body-md text-text-secondary dark:text-dark-text-secondary">
                {caseStudy.outcome}
              </p>
            </CardContent>
          </Card>
        )}

        <div className="text-center">
          <Button asChild size="lg">
            <Link href="/booking">{tCommon('bookConsultation')}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
