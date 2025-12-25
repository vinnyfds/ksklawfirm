'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/lib/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Select } from '@/components/ui/Select';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { useState, useEffect, useMemo } from 'react';

// Placeholder posts will be created using translations

type BlogPageClientProps = {
  locale: string;
};

export function BlogPageClient({ locale }: BlogPageClientProps) {
  const t = useTranslations('articles');
  const tNav = useTranslations('nav');
  
  // Create placeholder posts with translations (memoized based on locale)
  const placeholderPosts = useMemo(() => [
    {
      slug: 'nri-property-guide',
      title: t('placeholders.nriPropertyGuide.title'),
      excerpt: t('placeholders.nriPropertyGuide.excerpt'),
      category: 'Property Law',
      publishedAt: '2024-01-15',
      readingTime: '5 min read',
    },
    {
      slug: 'divorce-procedure-nri',
      title: t('placeholders.divorceProcedureNri.title'),
      excerpt: t('placeholders.divorceProcedureNri.excerpt'),
      category: 'Family Law',
      publishedAt: '2024-01-10',
      readingTime: '7 min read',
    },
    {
      slug: 'property-litigation-tips',
      title: t('placeholders.propertyLitigationTips.title'),
      excerpt: t('placeholders.propertyLitigationTips.excerpt'),
      category: 'Property Law',
      publishedAt: '2024-01-05',
      readingTime: '4 min read',
    },
  ], [t, locale]);
  
  // Category mapping for translations (memoized based on locale)
  const categoryTranslationMap: Record<string, string> = useMemo(() => ({
    'Property Law': t('categories.propertyLaw'),
    'Family Law': t('categories.familyLaw'),
    'Civil Law': t('categories.civilLaw'),
    'Criminal Law': t('categories.criminalLaw'),
  }), [t, locale]);
  
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [posts, setPosts] = useState(placeholderPosts);
  const [isLoading, setIsLoading] = useState(false);
  const categories = ['all', 'Property Law', 'Family Law', 'Civil Law', 'Criminal Law'];
  
  // Reset state and update placeholders when locale changes
  useEffect(() => {
    setSelectedCategory('all');
    setPosts(placeholderPosts);
  }, [locale, placeholderPosts]);

  useEffect(() => {
    setIsLoading(true);
    fetch(`/api/blog?locale=${locale}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data.posts.length > 0) {
          setPosts(data.data.posts);
        } else {
          // Fallback to translated placeholders if no data from API
          setPosts(placeholderPosts);
        }
      })
      .catch((err) => {
        console.error('Error fetching blog posts:', err);
        // Fallback to translated placeholders on error
        setPosts(placeholderPosts);
      })
      .finally(() => setIsLoading(false));
  }, [locale, placeholderPosts]);

  const filteredPosts =
    selectedCategory === 'all'
      ? posts
      : posts.filter((post) => post.category === selectedCategory);

  const breadcrumbs = [
    { label: tNav('home'), href: '/' },
    { label: tNav('blog'), href: '/blog' },
  ];

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="max-w-6xl mx-auto">
        <Breadcrumbs items={breadcrumbs} />
        <h1 className="text-h1 font-serif font-bold text-brand-primary mb-4 text-center">
          {t('pageTitle')}
        </h1>
        <p className="text-body-lg text-text-secondary dark:text-dark-text-secondary text-center mb-12 max-w-2xl mx-auto">
          {t('pageDescription')}
        </p>

        <div className="mb-8 flex justify-center">
          <Select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full md:w-64"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === 'all' ? t('allCategories') : categoryTranslationMap[cat] || cat}
              </option>
            ))}
          </Select>
        </div>

        {filteredPosts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-text-secondary dark:text-dark-text-secondary">
              {t('noPostsFound')}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <Card key={post.slug} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-body-sm text-brand-secondary font-medium">
                      {categoryTranslationMap[post.category] || post.category}
                    </span>
                    <span className="text-body-sm text-text-secondary dark:text-dark-text-secondary">
                      {post.readingTime}
                    </span>
                  </div>
                  <CardTitle className="text-brand-primary line-clamp-2">{post.title}</CardTitle>
                  <CardDescription className="text-body-sm">
                    {new Date(post.publishedAt).toLocaleDateString(locale, {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-body-sm text-text-secondary dark:text-dark-text-secondary mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-brand-secondary hover:text-brand-accent transition-colors font-medium text-body-sm"
                  >
                    {t('readMoreLabel')} →
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

