'use client';

import { useTranslations } from 'next-intl';
import { CaseStudyCard } from '@/components/sections/CaseStudyCard';
import { Select } from '@/components/ui/Select';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { useState, useEffect, useMemo } from 'react';

// Placeholder case studies will be created using translations

type CaseStudiesPageClientProps = {
  locale: string;
};

export function CaseStudiesPageClient({ locale }: CaseStudiesPageClientProps) {
  const t = useTranslations('caseStudies');
  const tNav = useTranslations('nav');
  const tServices = useTranslations('services');
  const tCommon = useTranslations('common');
  
  // Create placeholder case studies with translations (memoized based on locale)
  const placeholderCaseStudies = useMemo(() => [
    {
      slug: 'nri-ancestral-property-success',
      title: t('placeholders.nriAncestralPropertySuccess.title'),
      excerpt: t('placeholders.nriAncestralPropertySuccess.excerpt'),
      category: 'Ancestral Properties',
      outcome: t('placeholders.nriAncestralPropertySuccess.outcome'),
      publishedAt: '2024-01-15',
    },
    {
      slug: 'mutual-consent-divorce-nri',
      title: t('placeholders.mutualConsentDivorceNri.title'),
      excerpt: t('placeholders.mutualConsentDivorceNri.excerpt'),
      category: 'Divorce',
      outcome: t('placeholders.mutualConsentDivorceNri.outcome'),
      publishedAt: '2024-01-10',
    },
  ], [t, locale]);
  
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [caseStudies, setCaseStudies] = useState(placeholderCaseStudies);
  const [isLoading, setIsLoading] = useState(false);
  
  // Reset state and update placeholders when locale changes
  useEffect(() => {
    setSelectedCategory('all');
    setCaseStudies(placeholderCaseStudies);
  }, [locale, placeholderCaseStudies]);
  
  // Category mapping: English category name -> translation key
  const categoryMap: Record<string, string> = {
    'all': 'all',
    'Ancestral Properties': 'ancestralProperties.title',
    'Divorce': 'divorce.title',
    'Property Litigation': 'propertyLitigation.title',
    'Civil Matters': 'civilMatters.title',
    'Criminal Matters': 'criminalMatters.title',
  };
  
  const categories = ['all', 'Ancestral Properties', 'Divorce', 'Property Litigation', 'Civil Matters', 'Criminal Matters'];

  useEffect(() => {
    setIsLoading(true);
    fetch(`/api/case-studies?locale=${locale}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data.caseStudies.length > 0) {
          setCaseStudies(data.data.caseStudies);
        } else {
          // Fallback to translated placeholders if no data from API
          setCaseStudies(placeholderCaseStudies);
        }
      })
      .catch((err) => {
        console.error('Error fetching case studies:', err);
        // Fallback to translated placeholders on error
        setCaseStudies(placeholderCaseStudies);
      })
      .finally(() => setIsLoading(false));
  }, [locale, placeholderCaseStudies]);

  const filteredCaseStudies =
    selectedCategory === 'all'
      ? caseStudies
      : caseStudies.filter((cs) => cs.category === selectedCategory);

  const breadcrumbs = [
    { label: tNav('home'), href: '/' },
    { label: t('pageTitle'), href: '/case-studies' },
  ];
  
  const getCategoryLabel = (category: string): string => {
    if (category === 'all') {
      return t('allCategories');
    }
    const translationKey = categoryMap[category];
    return translationKey ? tServices(translationKey) : category;
  };

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
                {getCategoryLabel(cat)}
              </option>
            ))}
          </Select>
        </div>

        {filteredCaseStudies.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-text-secondary dark:text-dark-text-secondary">
              {t('noCaseStudiesFound')}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCaseStudies.map((caseStudy) => (
              <CaseStudyCard key={caseStudy.slug} caseStudy={caseStudy} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

