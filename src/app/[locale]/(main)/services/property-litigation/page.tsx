import { Link } from '@/lib/navigation';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export default function PropertyLitigationPage() {
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'Property Litigation', href: '/services/property-litigation' },
  ];

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="max-w-4xl mx-auto">
        <Breadcrumbs items={breadcrumbs} />
        <h1 className="text-h1 font-serif font-bold text-brand-primary mb-4">
          Property Litigation Services
        </h1>
        <p className="text-body-lg text-text-secondary dark:text-dark-text-secondary mb-8">
          Strong representation in property disputes, real estate litigation, and land-related
          legal matters for NRIs.
        </p>

        {/* For NRIs Section */}
        <section className="mb-12">
          <Card className="bg-brand-primary/5 dark:bg-brand-primary/10">
            <CardContent className="p-8">
              <h2 className="text-h2 font-serif font-bold text-brand-primary mb-4">
                For Non-Resident Indians
              </h2>
              <p className="text-body-md text-text-secondary dark:text-dark-text-secondary mb-4">
                Property litigation for NRIs involves unique complexities:
              </p>
              <ul className="space-y-2 text-body-md text-text-secondary dark:text-dark-text-secondary list-disc list-inside">
                <li>Protecting property rights from a distance</li>
                <li>Dealing with encroachments and illegal possession</li>
                <li>Understanding local property laws and regulations</li>
                <li>Managing litigation timelines and court appearances</li>
                <li>Coordinating with local authorities and courts</li>
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
                  Case Evaluation
                </h3>
                <p className="text-body-md text-text-secondary dark:text-dark-text-secondary">
                  We thoroughly evaluate your property dispute, review all documents, and assess the
                  strength of your case to determine the best legal strategy.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-h4 font-serif font-bold text-brand-primary mb-2">
                  Legal Documentation
                </h3>
                <p className="text-body-md text-text-secondary dark:text-dark-text-secondary">
                  We prepare and file all necessary legal documents, including suits, petitions,
                  and responses, ensuring compliance with all procedural requirements.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-h4 font-serif font-bold text-brand-primary mb-2">
                  Court Representation
                </h3>
                <p className="text-body-md text-text-secondary dark:text-dark-text-secondary">
                  We represent you in all court proceedings, hearings, and negotiations, ensuring
                  your interests are vigorously defended.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-h4 font-serif font-bold text-brand-primary mb-2">
                  Regular Updates
                </h3>
                <p className="text-body-md text-text-secondary dark:text-dark-text-secondary">
                  We provide regular updates on case progress via email and scheduled calls, keeping
                  you informed without requiring frequent travel.
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
                  What types of property disputes can you handle?
                </h3>
                <p className="text-body-md text-text-secondary dark:text-dark-text-secondary">
                  We handle various property disputes including title disputes, boundary issues,
                  encroachments, eviction matters, and recovery of possession cases.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-h4 font-serif font-bold text-brand-primary mb-2">
                  Do I need to be present in India for court hearings?
                </h3>
                <p className="text-body-md text-text-secondary dark:text-dark-text-secondary">
                  In most cases, we can represent you without your physical presence. However, some
                  situations may require your appearance, which we'll discuss during consultation.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-h4 font-serif font-bold text-brand-primary mb-2">
                  How long does property litigation typically take?
                </h3>
                <p className="text-body-md text-text-secondary dark:text-dark-text-secondary">
                  Property litigation duration varies significantly based on case complexity. Simple
                  matters may resolve in 6-12 months, while complex disputes can take 2-5 years. We
                  provide realistic timelines during consultation.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center bg-brand-primary text-white p-8 rounded-lg">
          <h2 className="text-h2 font-serif font-bold mb-4">Facing a Property Dispute?</h2>
          <p className="text-body-md mb-6 max-w-2xl mx-auto">
            Get expert legal representation to protect your property rights.
          </p>
          <Button asChild size="lg" variant="default">
            <Link href="/booking">Book a Consultation</Link>
          </Button>
        </section>
      </div>
    </div>
  );
}
