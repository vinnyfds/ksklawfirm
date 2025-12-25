import { Link } from '@/lib/navigation';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { generateSEOMetadata, getBaseUrl } from '@/lib/seo';
import { generateLegalServiceSchema } from '@/lib/schema';
import { SchemaScript } from '@/components/seo/SchemaScript';
import { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = getBaseUrl();

  return generateSEOMetadata(
    {
      title: 'Divorce Legal Services for NRIs | KSK Law Firm',
      description:
        'Comprehensive legal support for divorce proceedings, including mutual consent divorces, for NRI couples. Expert guidance from High Court Advocate.',
      canonical: `${baseUrl}/${locale}/services/divorce`,
      locale,
    },
    baseUrl
  );
}

export default async function DivorcePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('services.divorce');
  const tServices = await getTranslations('services');
  const baseUrl = getBaseUrl();

  const schema = generateLegalServiceSchema({
    name: t('pageTitle'),
    description: t('description'),
    serviceType: 'Legal Service',
    areaServed: ['India', 'USA', 'United Kingdom', 'UAE', 'Canada', 'Australia'],
    provider: {
      name: 'KSK Law Firm',
      url: baseUrl,
    },
  });
  const breadcrumbs = [
    { label: tServices('breadcrumbs.home'), href: '/' },
    { label: tServices('breadcrumbs.services'), href: '/services' },
    { label: t('title'), href: '/services/divorce' },
  ];

  return (
    <>
      <SchemaScript schema={schema} />
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          <Breadcrumbs items={breadcrumbs} />
        <h1 className="text-h1 font-serif font-bold text-brand-primary mb-4">
          {t('pageTitle')}
        </h1>
        <p className="text-body-lg text-text-secondary dark:text-dark-text-secondary mb-8">
          {t('description')}
        </p>

        {/* For NRIs Section */}
        <section className="mb-12">
          <Card className="bg-brand-primary/5 dark:bg-brand-primary/10">
            <CardContent className="p-8">
              <h2 className="text-h2 font-serif font-bold text-brand-primary mb-4">
                {t('forNriTitle')}
              </h2>
              <p className="text-body-md text-text-secondary dark:text-dark-text-secondary mb-4">
                {t('forNriDescription')}
              </p>
              <ul className="space-y-2 text-body-md text-text-secondary dark:text-dark-text-secondary list-disc list-inside">
                <li>{t('forNriPoints.point1')}</li>
                <li>{t('forNriPoints.point2')}</li>
                <li>{t('forNriPoints.point3')}</li>
                <li>{t('forNriPoints.point4')}</li>
                <li>{t('forNriPoints.point5')}</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Process Overview */}
        <section className="mb-12">
          <h2 className="text-h2 font-serif font-bold text-brand-primary mb-4">{t('processTitle')}</h2>
          <div className="space-y-4">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-h4 font-serif font-bold text-brand-primary mb-2">
                  {t('processSteps.step1Title')}
                </h3>
                <p className="text-body-md text-text-secondary dark:text-dark-text-secondary">
                  {t('processSteps.step1Description')}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-h4 font-serif font-bold text-brand-primary mb-2">
                  {t('processSteps.step2Title')}
                </h3>
                <p className="text-body-md text-text-secondary dark:text-dark-text-secondary">
                  {t('processSteps.step2Description')}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-h4 font-serif font-bold text-brand-primary mb-2">
                  {t('processSteps.step3Title')}
                </h3>
                <p className="text-body-md text-text-secondary dark:text-dark-text-secondary">
                  {t('processSteps.step3Description')}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-h4 font-serif font-bold text-brand-primary mb-2">
                  {t('processSteps.step4Title')}
                </h3>
                <p className="text-body-md text-text-secondary dark:text-dark-text-secondary">
                  {t('processSteps.step4Description')}
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-12">
          <h2 className="text-h2 font-serif font-bold text-brand-primary mb-4">
            {t('faqTitle')}
          </h2>
          <div className="space-y-4">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-h4 font-serif font-bold text-brand-primary mb-2">
                  {t('faqs.q1')}
                </h3>
                <p className="text-body-md text-text-secondary dark:text-dark-text-secondary">
                  {t('faqs.a1')}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-h4 font-serif font-bold text-brand-primary mb-2">
                  {t('faqs.q2')}
                </h3>
                <p className="text-body-md text-text-secondary dark:text-dark-text-secondary">
                  {t('faqs.a2')}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-h4 font-serif font-bold text-brand-primary mb-2">
                  {t('faqs.q3')}
                </h3>
                <p className="text-body-md text-text-secondary dark:text-dark-text-secondary">
                  {t('faqs.a3')}
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center bg-brand-primary text-white p-8 rounded-lg">
          <h2 className="text-h2 font-serif font-bold mb-4">{t('ctaTitle')}</h2>
          <p className="text-body-md mb-6 max-w-2xl mx-auto">
            {t('ctaDescription')}
          </p>
          <Button asChild size="lg" variant="default">
            <Link href="/booking">{t('ctaButton')}</Link>
          </Button>
        </section>
        </div>
      </div>
    </>
  );
}
