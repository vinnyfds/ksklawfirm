import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/lib/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
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
      title: 'Legal Services for NRIs | KSK Law Firm',
      description:
        'Comprehensive legal services tailored specifically for Non-Resident Indians. Specializing in ancestral properties, divorce, property litigations, and civil/criminal matters.',
      canonical: `${baseUrl}/${locale}/services`,
      locale,
    },
    baseUrl
  );
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('services');
  const tCommon = await getTranslations('common');

  const services = [
    {
      slug: 'ancestral-properties',
      title: t('ancestralProperties.title'),
      description: t('ancestralProperties.description'),
      icon: '🏛️',
    },
    {
      slug: 'divorce',
      title: t('divorce.title'),
      description: t('divorce.description'),
      icon: '⚖️',
    },
    {
      slug: 'property-litigation',
      title: t('propertyLitigation.title'),
      description: t('propertyLitigation.description'),
      icon: '🏠',
    },
    {
      slug: 'civil-matters',
      title: t('civilMatters.title'),
      description: t('civilMatters.description'),
      icon: '📜',
    },
    {
      slug: 'criminal-matters',
      title: t('criminalMatters.title'),
      description: t('criminalMatters.description'),
      icon: '⚔️',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="max-w-4xl mx-auto mb-12 text-center">
        <h1 className="text-h1 font-serif font-bold text-brand-primary mb-4">
          {t('pageTitle')}
        </h1>
        <p className="text-body-lg text-text-secondary dark:text-dark-text-secondary">
          {t('pageDescription')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {services.map((service) => (
          <Card key={service.slug} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="text-4xl mb-2">{service.icon}</div>
              <CardTitle className="text-brand-primary">{service.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">{service.description}</CardDescription>
              <Button asChild variant="outline" className="w-full">
                <Link href={`/services/${service.slug}`}>{tCommon('learnMore')}</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center bg-brand-primary text-white p-8 rounded-lg">
        <h2 className="text-h2 font-serif font-bold mb-4">{t('needAssistanceTitle')}</h2>
        <p className="text-body-md mb-6 max-w-2xl mx-auto">
          {t('needAssistanceDescription')}
        </p>
        <Button asChild size="lg" variant="default">
          <Link href="/booking">{tCommon('bookConsultation')}</Link>
        </Button>
      </div>
    </div>
  );
}
