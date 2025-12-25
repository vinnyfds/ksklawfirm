import { BlogPageClient } from './BlogPageClient';
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
      title: 'Legal Blog | NRI Legal Insights | KSK Law Firm',
      description:
        'Expert insights and guidance on legal matters relevant to Non-Resident Indians. Stay informed about ancestral properties, divorce, property litigation, and more.',
      canonical: `${baseUrl}/${locale}/blog`,
      locale,
    },
    baseUrl
  );
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  return <BlogPageClient key={locale} locale={locale} />;
}



