'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/lib/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';

type Article = {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
};

// Placeholder articles - will be replaced with API data
const placeholderArticles: Article[] = [
  {
    slug: 'nri-property-guide',
    title: 'The NRI Guide to Ancestral Property Laws in India',
    excerpt:
      'Understanding the complexities of ancestral property rights and how NRIs can protect their interests.',
    publishedAt: '2024-01-15',
  },
  {
    slug: 'divorce-procedure-nri',
    title: 'Navigating Divorce in India from Abroad',
    excerpt:
      'A comprehensive guide to mutual consent divorce procedures for NRIs living outside India.',
    publishedAt: '2024-01-10',
  },
  {
    slug: 'property-litigation-tips',
    title: '5 Common Pitfalls for NRIs in Property Disputes',
    excerpt:
      'Learn about the most common mistakes NRIs make in property litigation and how to avoid them.',
    publishedAt: '2024-01-05',
  },
];

export function RecentArticlesSection() {
  const t = useTranslations('articles');
  const locale = useLocale();
  // TODO: Fetch articles from API
  const articles = placeholderArticles;

  if (articles.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-surface-bg dark:bg-dark-surface-bg">
      <div className="container mx-auto px-4">
        <h2 className="text-h2 font-serif font-bold text-brand-primary mb-4 text-center">
          {t('sectionTitle')}
        </h2>
        <p className="text-body-md text-text-secondary dark:text-dark-text-secondary text-center mb-12 max-w-2xl mx-auto">
          {t('sectionDescription')}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((article) => (
            <Card key={article.slug} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-brand-primary line-clamp-2">{article.title}</CardTitle>
                <CardDescription className="text-body-sm">
                  {new Date(article.publishedAt).toLocaleDateString(locale, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-body-sm text-text-secondary dark:text-dark-text-secondary mb-4 line-clamp-3">
                  {article.excerpt}
                </p>
                <Link
                  href={`/blog/${article.slug}`}
                  className="text-brand-secondary hover:text-brand-accent transition-colors font-medium text-body-sm"
                >
                  {t('readMore')} →
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link
            href="/blog"
            className="text-brand-secondary hover:text-brand-accent transition-colors font-medium"
          >
            {t('viewAll')} →
          </Link>
        </div>
      </div>
    </section>
  );
}

