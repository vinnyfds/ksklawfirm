import { getTranslations } from 'next-intl/server';
import { CaseStudiesPageClient } from './CaseStudiesPageClient';
import { generateSEOMetadata, getBaseUrl } from '@/lib/seo';
import { Metadata } from 'next';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = getBaseUrl();

  return generateSEOMetadata(
    {
      title: 'Case Studies | NRI Legal Success Stories | KSK Law Firm',
      description:
        'Real success stories from our NRI clients who have trusted us with their legal matters. Learn about our successful cases in ancestral properties, divorce, and property litigation.',
      canonical: `${baseUrl}/${locale}/case-studies`,
      locale,
    },
    baseUrl
  );
}

export default async function CaseStudiesPage({ params }: Props) {
  const { locale } = await params;
  return <CaseStudiesPageClient locale={locale} />;
}
