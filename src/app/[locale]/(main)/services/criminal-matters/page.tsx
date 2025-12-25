import { Link } from '@/lib/navigation';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { generateSEOMetadata, getBaseUrl } from '@/lib/seo';
import { generateLegalServiceSchema } from '@/lib/schema';
import { SchemaScript } from '@/components/seo/SchemaScript';
import { Metadata } from 'next';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = getBaseUrl();

  return generateSEOMetadata(
    {
      title: 'Criminal Matters Legal Services for NRIs | KSK Law Firm',
      description:
        'Expert defense and representation in criminal cases for NRIs. Ensuring your rights are protected throughout the legal process. High Court Advocate.',
      canonical: `${baseUrl}/${locale}/services/criminal-matters`,
      locale,
    },
    baseUrl
  );
}

export default async function CriminalMattersPage({ params }: Props) {
  const { locale } = await params;
  const baseUrl = getBaseUrl();

  const schema = generateLegalServiceSchema({
    name: 'Criminal Matters Legal Services',
    description:
      'Expert defense and representation in criminal cases, ensuring your rights are protected throughout the legal process.',
    serviceType: 'Legal Service',
    areaServed: ['India', 'USA', 'United Kingdom', 'UAE', 'Canada', 'Australia'],
    provider: {
      name: 'KSK Law Firm',
      url: baseUrl,
    },
  });
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'Criminal Matters', href: '/services/criminal-matters' },
  ];

  return (
    <>
      <SchemaScript schema={schema} />
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          <Breadcrumbs items={breadcrumbs} />
        <h1 className="text-h1 font-serif font-bold text-brand-primary mb-4">
          Criminal Matters Legal Services
        </h1>
        <p className="text-body-lg text-text-secondary dark:text-dark-text-secondary mb-8">
          Expert defense and representation in criminal cases, ensuring your rights are protected
          throughout the legal process.
        </p>

        {/* For NRIs Section */}
        <section className="mb-12">
          <Card className="bg-brand-primary/5 dark:bg-brand-primary/10">
            <CardContent className="p-8">
              <h2 className="text-h2 font-serif font-bold text-brand-primary mb-4">
                For Non-Resident Indians
              </h2>
              <p className="text-body-md text-text-secondary dark:text-dark-text-secondary mb-4">
                Criminal matters for NRIs require specialized attention:
              </p>
              <ul className="space-y-2 text-body-md text-text-secondary dark:text-dark-text-secondary list-disc list-inside">
                <li>Understanding Indian criminal law and procedures</li>
                <li>Managing cases while living abroad</li>
                <li>Ensuring proper legal representation in court</li>
                <li>Protecting your rights and interests</li>
                <li>Coordinating with law enforcement and courts</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Process Overview */}
        <section className="mb-12">
          <h2 className="text-h2 font-serif font-bold text-brand-primary mb-4">Our Process</h2>
          <div className="space-y-4">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-h4 font-serif font-bold text-brand-primary mb-2">
                  Case Assessment
                </h3>
                <p className="text-body-md text-text-secondary dark:text-dark-text-secondary">
                  We thoroughly assess your criminal case, review all charges and evidence, and
                  develop a strong defense strategy.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-h4 font-serif font-bold text-brand-primary mb-2">
                  Legal Defense
                </h3>
                <p className="text-body-md text-text-secondary dark:text-dark-text-secondary">
                  We prepare and present a robust defense, file necessary applications, and ensure
                  all legal procedures are followed correctly.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-h4 font-serif font-bold text-brand-primary mb-2">
                  Court Representation
                </h3>
                <p className="text-body-md text-text-secondary dark:text-dark-text-secondary">
                  We represent you in all court proceedings, hearings, and bail applications,
                  ensuring your rights are protected at every stage.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-h4 font-serif font-bold text-brand-primary mb-2">
                  Regular Communication
                </h3>
                <p className="text-body-md text-text-secondary dark:text-dark-text-secondary">
                  We maintain regular communication, providing updates on case progress and
                  advising on all legal developments.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-12">
          <h2 className="text-h2 font-serif font-bold text-brand-primary mb-4">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-h4 font-serif font-bold text-brand-primary mb-2">
                  What types of criminal cases do you handle?
                </h3>
                <p className="text-body-md text-text-secondary dark:text-dark-text-secondary">
                  We handle various criminal matters including fraud, financial crimes, property
                  offenses, and other criminal cases. We provide strong defense representation in all
                  matters.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-h4 font-serif font-bold text-brand-primary mb-2">
                  Do I need to be present in India for criminal proceedings?
                </h3>
                <p className="text-body-md text-text-secondary dark:text-dark-text-secondary">
                  Criminal cases often require your presence, especially for hearings and court
                  appearances. However, we can handle many procedural matters on your behalf and
                  minimize required travel.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-h4 font-serif font-bold text-brand-primary mb-2">
                  How do you handle bail applications?
                </h3>
                <p className="text-body-md text-text-secondary dark:text-dark-text-secondary">
                  We prepare and file bail applications, present strong arguments, and work to
                  secure bail when appropriate, ensuring all legal requirements are met.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center bg-brand-primary text-white p-8 rounded-lg">
          <h2 className="text-h2 font-serif font-bold mb-4">Need Criminal Defense?</h2>
          <p className="text-body-md mb-6 max-w-2xl mx-auto">
            Get expert legal representation to protect your rights and interests.
          </p>
          <Button asChild size="lg" variant="default">
            <Link href="/booking">Book a Consultation</Link>
          </Button>
        </section>
        </div>
      </div>
    </>
  );
}
