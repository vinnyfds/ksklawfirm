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
  const baseUrl = getBaseUrl();

  const schema = generateLegalServiceSchema({
    name: 'Divorce Legal Services',
    description:
      'Comprehensive legal support for divorce proceedings, including mutual consent divorces, for NRI couples.',
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
    { label: 'Divorce', href: '/services/divorce' },
  ];

  return (
    <>
      <SchemaScript schema={schema} />
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          <Breadcrumbs items={breadcrumbs} />
        <h1 className="text-h1 font-serif font-bold text-brand-primary mb-4">
          Divorce Legal Services for NRIs
        </h1>
        <p className="text-body-lg text-text-secondary dark:text-dark-text-secondary mb-8">
          Comprehensive legal support for divorce proceedings, including mutual consent divorces, for
          NRI couples.
        </p>

        {/* For NRIs Section */}
        <section className="mb-12">
          <Card className="bg-brand-primary/5 dark:bg-brand-primary/10">
            <CardContent className="p-8">
              <h2 className="text-h2 font-serif font-bold text-brand-primary mb-4">
                For Non-Resident Indians
              </h2>
              <p className="text-body-md text-text-secondary dark:text-dark-text-secondary mb-4">
                NRI couples facing divorce face unique challenges:
              </p>
              <ul className="space-y-2 text-body-md text-text-secondary dark:text-dark-text-secondary list-disc list-inside">
                <li>Navigating Indian divorce laws while living abroad</li>
                <li>Understanding mutual consent vs. contested divorce procedures</li>
                <li>Managing property division and alimony matters across borders</li>
                <li>Child custody considerations when parents are in different countries</li>
                <li>Coordination of legal proceedings without frequent travel to India</li>
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
                  Initial Assessment
                </h3>
                <p className="text-body-md text-text-secondary dark:text-dark-text-secondary">
                  We assess your situation to determine if mutual consent divorce is possible or if
                  a contested divorce is necessary, explaining all options clearly.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-h4 font-serif font-bold text-brand-primary mb-2">
                  Documentation & Filing
                </h3>
                <p className="text-body-md text-text-secondary dark:text-dark-text-secondary">
                  We handle all necessary documentation, including marriage certificates, settlement
                  agreements, and court filings, minimizing your need to travel.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-h4 font-serif font-bold text-brand-primary mb-2">
                  Negotiation & Settlement
                </h3>
                <p className="text-body-md text-text-secondary dark:text-dark-text-secondary">
                  We negotiate on your behalf for fair settlement terms regarding property
                  division, alimony, and child custody, keeping you informed throughout.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-h4 font-serif font-bold text-brand-primary mb-2">
                  Court Representation
                </h3>
                <p className="text-body-md text-text-secondary dark:text-dark-text-secondary">
                  We represent you in all court proceedings, ensuring your interests are protected
                  and the process moves forward efficiently.
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
                  Can I get a divorce in India if I'm living abroad?
                </h3>
                <p className="text-body-md text-text-secondary dark:text-dark-text-secondary">
                  Yes, if you were married in India or under Indian law, you can file for divorce in
                  India. We can handle most of the process remotely, with minimal travel required.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-h4 font-serif font-bold text-brand-primary mb-2">
                  What is mutual consent divorce?
                </h3>
                <p className="text-body-md text-text-secondary dark:text-dark-text-secondary">
                  Mutual consent divorce is when both parties agree to end the marriage. It's
                  faster (typically 6-18 months) and less contentious than contested divorce. We
                  help facilitate this process.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-h4 font-serif font-bold text-brand-primary mb-2">
                  How is property divided in NRI divorces?
                </h3>
                <p className="text-body-md text-text-secondary dark:text-dark-text-secondary">
                  Property division follows Indian law, considering both Indian and foreign assets.
                  We help negotiate fair settlements that account for all marital property.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center bg-brand-primary text-white p-8 rounded-lg">
          <h2 className="text-h2 font-serif font-bold mb-4">Need Divorce Legal Assistance?</h2>
          <p className="text-body-md mb-6 max-w-2xl mx-auto">
            Book a consultation to discuss your situation and explore your options.
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
