'use client';

import { useTranslations } from 'next-intl';
import { CaseStudyCard } from '@/components/sections/CaseStudyCard';
import { Select } from '@/components/ui/Select';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { useState, useEffect } from 'react';

const placeholderCaseStudies = [
  {
    slug: 'nri-ancestral-property-success',
    title: 'Successful Resolution of NRI Ancestral Property Dispute',
    excerpt:
      'An NRI client from the USA successfully resolved a complex ancestral property dispute involving multiple heirs and property partitions.',
    category: 'Ancestral Properties',
    outcome: 'Property successfully partitioned and client received their rightful share',
    publishedAt: '2024-01-15',
  },
  {
    slug: 'mutual-consent-divorce-nri',
    title: 'Smooth Mutual Consent Divorce for NRI Couple',
    excerpt:
      'Facilitated a mutual consent divorce for an NRI couple living in the UK, handling all legal procedures remotely.',
    category: 'Divorce',
    outcome: 'Divorce finalized within 6 months with fair settlement agreement',
    publishedAt: '2024-01-10',
  },
];

export default function CaseStudiesPage() {
  const t = useTranslations('caseStudies');
  const tNav = useTranslations('nav');
  const tServices = useTranslations('services');
  
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [caseStudies, setCaseStudies] = useState(placeholderCaseStudies);
  const [isLoading, setIsLoading] = useState(false);
  
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
    fetch('/api/case-studies')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data.caseStudies.length > 0) {
          setCaseStudies(data.data.caseStudies);
        }
      })
      .catch((err) => {
        console.error('Error fetching case studies:', err);
      })
      .finally(() => setIsLoading(false));
  }, []);

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
