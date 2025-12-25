import { getTranslations } from 'next-intl/server';
import { HeroSection } from '@/components/sections/HeroSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { CredibilityBar } from '@/components/sections/CredibilityBar';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { RecentArticlesSection } from '@/components/sections/RecentArticlesSection';
import { Button } from '@/components/ui/Button';
import { Link } from '@/lib/navigation';
import { generateSEOMetadata, getBaseUrl } from '@/lib/seo';
import { generateOrganizationSchema, generatePersonSchema } from '@/lib/schema';
import { SchemaScript } from '@/components/seo/SchemaScript';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const baseUrl = getBaseUrl();
  
  return generateSEOMetadata(
    {
      title: 'Law Firm for NRIs in India | KSK Law Firm',
      description:
        'Expert legal services for Non-Resident Indians (NRIs) in Hyderabad, India. Specializing in ancestral properties, divorce, property litigations, and civil/criminal matters. 20 years of High Court experience.',
      canonical: `${baseUrl}/${locale}`,
      locale,
    },
    baseUrl
  );
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations('common');
  const baseUrl = getBaseUrl();

  const organizationSchema = generateOrganizationSchema({
    name: 'KSK Law Firm',
    url: baseUrl,
    description:
      'Expert legal services for Non-Resident Indians (NRIs) in Hyderabad, India. High Court Advocate with 20 years of experience.',
    contactPoint: {
      telephone: '+91 9440217782',
      contactType: 'Legal Services',
      areaServed: ['India', 'USA', 'United Kingdom', 'UAE', 'Canada', 'Australia'],
      availableLanguage: ['en', 'hi', 'te', 'ta'],
    },
    address: {
      addressLocality: 'Hyderabad',
      addressRegion: 'Telangana',
      addressCountry: 'India',
    },
  });

  const personSchema = generatePersonSchema({
    name: 'Kalanidhi Sanjeeva Kumar',
    jobTitle: 'High Court Advocate',
    description:
      'High Court Advocate with 20 years of experience specializing in NRI legal matters, ancestral properties, divorce, and property litigations.',
    telephone: '+91 9440217782',
    address: {
      addressLocality: 'Hyderabad',
      addressRegion: 'Telangana',
      addressCountry: 'India',
    },
  });

  return (
    <>
      <SchemaScript schema={organizationSchema} />
      <SchemaScript schema={personSchema} />
      <HeroSection />
      <ServicesSection />
      <CredibilityBar />
      <TestimonialsSection />
      <RecentArticlesSection />
      <section className="py-16 md:py-24 bg-brand-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-h2 font-serif font-bold mb-4">
            {t('readyToGetStarted')}
          </h2>
          <p className="text-body-lg mb-8 max-w-2xl mx-auto">
            {t('bookConsultationToday')}
          </p>
          <Button asChild size="lg" variant="default">
            <Link href="/booking">{t('scheduleConsultation')}</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
