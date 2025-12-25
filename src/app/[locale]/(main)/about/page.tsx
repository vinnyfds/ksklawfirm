import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/lib/navigation';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
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
      title: 'About Kalanidhi Sanjeeva Kumar | High Court Advocate',
      description:
        'Meet Kalanidhi Sanjeeva Kumar, High Court Advocate with 20 years of experience specializing in NRI legal matters, ancestral properties, divorce, and property litigations.',
      canonical: `${baseUrl}/${locale}/about`,
      locale,
    },
    baseUrl
  );
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('about');
  const tCommon = await getTranslations('common');

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-h1 font-serif font-bold text-brand-primary mb-8 text-center">
          {t('title')}
        </h1>

        {/* Professional Bio */}
        <section className="mb-12">
          <Card className="mb-8">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="flex-shrink-0">
                  <div className="w-48 h-48 bg-brand-secondary rounded-lg flex items-center justify-center text-white text-6xl">
                    KSK
                  </div>
                </div>
                <div className="flex-grow">
                  <h2 className="text-h2 font-serif font-bold text-brand-primary mb-4">
                    {t('bioTitle')}
                  </h2>
                  <p className="text-body-md text-text-secondary dark:text-dark-text-secondary mb-4">
                    {t('bioParagraph1')}
                  </p>
                  <p className="text-body-md text-text-secondary dark:text-dark-text-secondary">
                    {t('bioParagraph2')}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Mission/Philosophy */}
        <section className="mb-12">
          <h2 className="text-h2 font-serif font-bold text-brand-primary mb-4">
            {t('missionTitle')}
          </h2>
          <Card>
            <CardContent className="p-8">
              <p className="text-body-md text-text-secondary dark:text-dark-text-secondary mb-4">
                {t('missionParagraph1')}
              </p>
              <p className="text-body-md text-text-secondary dark:text-dark-text-secondary">
                {t('missionParagraph2')}
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Qualifications */}
        <section className="mb-12">
          <h2 className="text-h2 font-serif font-bold text-brand-primary mb-4">
            {t('qualificationsTitle')}
          </h2>
          <Card>
            <CardContent className="p-8">
              <ul className="space-y-3 text-body-md text-text-secondary dark:text-dark-text-secondary">
                <li className="flex items-start">
                  <span className="text-brand-accent mr-2">✓</span>
                  <span>{t('qualification1')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-accent mr-2">✓</span>
                  <span>{t('qualification2')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-accent mr-2">✓</span>
                  <span>{t('qualification3')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-accent mr-2">✓</span>
                  <span>{t('qualification4')}</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Experience Highlights */}
        <section className="mb-12">
          <h2 className="text-h2 font-serif font-bold text-brand-primary mb-4">
            {t('experienceTitle')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-h4 font-serif font-bold text-brand-primary mb-2">
                  {t('experience1Title')}
                </h3>
                <p className="text-body-sm text-text-secondary dark:text-dark-text-secondary">
                  {t('experience1Description')}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-h4 font-serif font-bold text-brand-primary mb-2">
                  {t('experience2Title')}
                </h3>
                <p className="text-body-sm text-text-secondary dark:text-dark-text-secondary">
                  {t('experience2Description')}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-h4 font-serif font-bold text-brand-primary mb-2">
                  {t('experience3Title')}
                </h3>
                <p className="text-body-sm text-text-secondary dark:text-dark-text-secondary">
                  {t('experience3Description')}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-h4 font-serif font-bold text-brand-primary mb-2">
                  {t('experience4Title')}
                </h3>
                <p className="text-body-sm text-text-secondary dark:text-dark-text-secondary">
                  {t('experience4Description')}
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <h2 className="text-h2 font-serif font-bold text-brand-primary mb-4">
            {t('ctaTitle')}
          </h2>
          <p className="text-body-md text-text-secondary dark:text-dark-text-secondary mb-8 max-w-2xl mx-auto">
            {t('ctaDescription')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/booking">{tCommon('bookConsultation')}</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/services">{tCommon('viewServices')}</Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
