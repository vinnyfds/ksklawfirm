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
      title: 'Civil Matters Legal Services for NRIs | KSK Law Firm',
      description:
        'Experienced handling of various civil cases including contract disputes, recovery matters, and civil suits for NRIs. High Court Advocate.',
      canonical: `${baseUrl}/${locale}/services/civil-matters`,
      locale,
    },
    baseUrl
  );
}

export default async function CivilMattersPage({ params }: Props) {
  const { locale } = await params;
  const baseUrl = getBaseUrl();

  const schema = generateLegalServiceSchema({
    name: 'Civil Matters Legal Services',
    description:
      'Experienced handling of various civil cases including contract disputes, recovery matters, and civil suits for NRIs.',
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
    { label: 'Civil Matters', href: '/services/civil-matters' },
  ];

  return (
    <>
      <SchemaScript schema={schema} />
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          <Breadcrumbs items={breadcrumbs} />
        <h1 className="text-h1 font-serif font-bold text-brand-primary mb-4">
          Civil Matters Legal Services
        </h1>
        <p className="text-body-lg text-text-secondary dark:text-dark-text-secondary mb-8">
          Experienced handling of various civil cases including contract disputes, recovery matters,
          and civil suits for NRIs.
        </p>

        {/* For NRIs Section */}
        <section className="mb-12">
          <Card className="bg-brand-primary/5 dark:bg-brand-primary/10">
            <CardContent className="p-8">
              <h2 className="text-h2 font-serif font-bold text-brand-primary mb-4">
                For Non-Resident Indians
              </h2>
              <p className="text-body-md text-text-secondary dark:text-dark-text-secondary mb-4">
                NRIs often face civil legal challenges:
              </p>
              <ul className="space-y-2 text-body-md text-text-secondary dark:text-dark-text-secondary list-disc list-inside">
                <li>Contract disputes with Indian parties</li>
                <li>Recovery of debts and financial matters</li>
                <li>Business and commercial disputes</li>
                <li>Consumer protection cases</li>
                <li>Administrative and regulatory matters</li>
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
                  Case Analysis
                </h3>
                <p className="text-body-md text-text-secondary dark:text-dark-text-secondary">
                  We analyze your civil matter, review all relevant documents and contracts, and
                  assess the legal merits of your case.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-h4 font-serif font-bold text-brand-primary mb-2">
                  Strategy Development
                </h3>
                <p className="text-body-md text-text-secondary dark:text-dark-text-secondary">
                  We develop a comprehensive legal strategy tailored to your specific situation,
                  whether it involves negotiation, mediation, or litigation.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-h4 font-serif font-bold text-brand-primary mb-2">
                  Legal Representation
                </h3>
                <p className="text-body-md text-text-secondary dark:text-dark-text-secondary">
                  We represent you in all legal proceedings, negotiations, and court appearances,
                  ensuring your interests are protected.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-h4 font-serif font-bold text-brand-primary mb-2">
                  Resolution & Follow-up
                </h3>
                <p className="text-body-md text-text-secondary dark:text-dark-text-secondary">
                  We work towards favorable resolution and ensure proper execution of judgments or
                  settlements, keeping you informed throughout.
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
                  What types of civil matters do you handle?
                </h3>
                <p className="text-body-md text-text-secondary dark:text-dark-text-secondary">
                  We handle various civil matters including contract disputes, recovery suits,
                  specific performance cases, injunctions, and other civil litigation matters.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-h4 font-serif font-bold text-brand-primary mb-2">
                  Can civil disputes be resolved without going to court?
                </h3>
                <p className="text-body-md text-text-secondary dark:text-dark-text-secondary">
                  Yes, many civil disputes can be resolved through negotiation, mediation, or
                  settlement. We explore all options before proceeding to litigation.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-h4 font-serif font-bold text-brand-primary mb-2">
                  How do you handle recovery matters for NRIs?
                </h3>
                <p className="text-body-md text-text-secondary dark:text-dark-text-secondary">
                  We file appropriate recovery suits, obtain necessary orders, and work towards
                  execution of decrees, handling all local requirements on your behalf.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center bg-brand-primary text-white p-8 rounded-lg">
          <h2 className="text-h2 font-serif font-bold mb-4">Need Civil Legal Assistance?</h2>
          <p className="text-body-md mb-6 max-w-2xl mx-auto">
            Book a consultation to discuss your civil matter and explore your legal options.
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
