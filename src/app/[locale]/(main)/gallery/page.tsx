import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { GallerySection } from '@/components/sections/GallerySection';
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
      title: 'Office Gallery | KSK Law Firm',
      description:
        'Explore our office space and professional environment where we serve our NRI clients with dedication and expertise.',
      canonical: `${baseUrl}/${locale}/gallery`,
      locale,
    },
    baseUrl
  );
}

export default async function GalleryPage({ params }: Props) {
  const { locale } = await params;
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Gallery', href: '/gallery' },
  ];

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="max-w-6xl mx-auto">
        <Breadcrumbs items={breadcrumbs} />
        
        <h1 className="text-h1 font-serif font-bold text-brand-primary mb-4 text-center mt-8">
          Gallery
        </h1>
        <p className="text-body-lg text-text-secondary dark:text-dark-text-secondary text-center mb-12 max-w-2xl mx-auto">
          Explore our office space and professional environment where we serve our NRI clients with dedication and expertise.
        </p>

        <GallerySection />
      </div>
    </div>
  );
}
