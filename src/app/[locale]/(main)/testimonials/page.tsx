import { getTranslations } from 'next-intl/server';
import { TestimonialsPageClient } from './TestimonialsPageClient';
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
      title: 'Client Testimonials | NRI Legal Services | KSK Law Firm',
      description:
        'Read what our clients have to say about their experience working with us. Trusted by Non-Resident Indians worldwide for reliable, professional legal services.',
      canonical: `${baseUrl}/${locale}/testimonials`,
      locale,
    },
    baseUrl
  );
}

export default async function TestimonialsPage({ params }: Props) {
  const { locale } = await params;
  return <TestimonialsPageClient locale={locale} />;
}
