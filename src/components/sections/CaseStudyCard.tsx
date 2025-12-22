'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/lib/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

type CaseStudy = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  outcome: string;
  publishedAt: string;
};

type CaseStudyCardProps = {
  caseStudy: CaseStudy;
};

export function CaseStudyCard({ caseStudy }: CaseStudyCardProps) {
  const t = useTranslations('caseStudies');
  const tServices = useTranslations('services');
  const locale = useLocale();

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

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <span className="text-body-sm text-brand-secondary font-medium">
            {getCategoryLabel(caseStudy.category)}
          </span>
          <span className="text-body-sm text-text-secondary dark:text-dark-text-secondary">
            {new Date(caseStudy.publishedAt).toLocaleDateString(locale, {
              year: 'numeric',
              month: 'short',
            })}
          </span>
        </div>
        <CardTitle className="text-brand-primary line-clamp-2">{caseStudy.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="mb-4 line-clamp-3">{caseStudy.excerpt}</CardDescription>
        <div className="mb-4">
          <p className="text-body-sm font-medium text-text-primary dark:text-dark-text-primary">
            {t('outcomeLabel')}
          </p>
          <p className="text-body-sm text-text-secondary dark:text-dark-text-secondary">
            {caseStudy.outcome}
          </p>
        </div>
        <Button asChild variant="outline" className="w-full">
          <Link href={`/case-studies/${caseStudy.slug}`}>{t('readCaseStudy')}</Link>
        </Button>
      </CardContent>
    </Card>
  );
}

