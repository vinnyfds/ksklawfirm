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
      title: 'Ancestral Properties Legal Services for NRIs | KSK Law Firm',
      description:
        'Expert legal guidance for NRIs dealing with ancestral property disputes, inheritance matters, and property rights in India. High Court Advocate with 20 years experience.',
      canonical: `${baseUrl}/${locale}/services/ancestral-properties`,
      locale,
    },
    baseUrl
  );
}

export default async function AncestralPropertiesPage({ params }: Props) {
  const { locale } = await params;
  const baseUrl = getBaseUrl();

  const schema = generateLegalServiceSchema({
    name: 'Ancestral Properties Legal Services',
    description:
      'Expert legal guidance for NRIs dealing with ancestral property disputes, inheritance matters, and property rights in India.',
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
    { label: 'Ancestral Properties', href: '/services/ancestral-properties' },
  ];

  return (
    <>
      <SchemaScript schema={schema} />
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          <Breadcrumbs items={breadcrumbs} />
        <h1 className="text-h1 font-serif font-bold text-brand-primary mb-4">
          Ancestral Properties Legal Services
        </h1>
        <p className="text-body-lg text-text-secondary dark:text-dark-text-secondary mb-8">
          Expert legal guidance for NRIs dealing with ancestral property disputes, inheritance
          matters, and property rights in India.
        </p>

        {/* For NRIs Section */}
        <section className="mb-12">
          <Card className="bg-brand-primary/5 dark:bg-brand-primary/10">
            <CardContent className="p-8">
              <h2 className="text-h2 font-serif font-bold text-brand-primary mb-4">
                For Non-Resident Indians
              </h2>
              <p className="text-body-md text-text-secondary dark:text-dark-text-secondary mb-4">
                As an NRI, managing ancestral property matters from abroad presents unique
                challenges:
              </p>
              <ul className="space-y-2 text-body-md text-text-secondary dark:text-dark-text-secondary list-disc list-inside">
                <li>Difficulty in physically being present for property inspections and legal proceedings</li>
                <li>Complex inheritance laws and succession rules in India</li>
                <li>Time zone differences affecting communication and coordination</li>
                <li>Understanding local property laws and regulations</li>
                <li>Protecting your rights and interests from a distance</li>
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
                  Initial Consultation
                </h3>
                <p className="text-body-md text-text-secondary dark:text-dark-text-secondary">
                  We start with a comprehensive consultation to understand your specific situation,
                  property details, and legal concerns. This can be done via audio call or document
                  review.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-h4 font-serif font-bold text-brand-primary mb-2">
                  Document Review & Analysis
                </h3>
                <p className="text-body-md text-text-secondary dark:text-dark-text-secondary">
                  We review all relevant property documents, inheritance papers, and legal records
                  to assess your case and identify potential issues or opportunities.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-h4 font-serif font-bold text-brand-primary mb-2">
                  Legal Strategy
                </h3>
                <p className="text-body-md text-text-secondary dark:text-dark-text-secondary">
                  Based on our analysis, we develop a tailored legal strategy to protect your
                  interests and achieve your objectives, keeping you informed every step of the way.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-h4 font-serif font-bold text-brand-primary mb-2">
                  Representation & Follow-up
                </h3>
                <p className="text-body-md text-text-secondary dark:text-dark-text-secondary">
                  We represent your interests in all legal proceedings, handle documentation, and
                  provide regular updates via email and scheduled calls.
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
                  Can I handle ancestral property matters from abroad?
                </h3>
                <p className="text-body-md text-text-secondary dark:text-dark-text-secondary">
                  Yes, with proper legal representation and documentation, you can effectively manage
                  ancestral property matters from abroad. We handle all local requirements while
                  keeping you informed.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-h4 font-serif font-bold text-brand-primary mb-2">
                  What documents do I need?
                </h3>
                <p className="text-body-md text-text-secondary dark:text-dark-text-secondary">
                  Typically, you'll need property deeds, inheritance documents, family tree
                  information, and any existing legal agreements. We'll provide a complete checklist
                  during consultation.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-h4 font-serif font-bold text-brand-primary mb-2">
                  How long do property disputes typically take?
                </h3>
                <p className="text-body-md text-text-secondary dark:text-dark-text-secondary">
                  The duration varies based on the complexity of the case. Simple matters may
                  resolve in a few months, while complex disputes can take 1-2 years. We'll provide
                  realistic timelines during consultation.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center bg-brand-primary text-white p-8 rounded-lg">
          <h2 className="text-h2 font-serif font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-body-md mb-6 max-w-2xl mx-auto">
            Book a consultation to discuss your ancestral property matter and get expert guidance.
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
