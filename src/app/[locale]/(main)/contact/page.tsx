import { ContactForm } from '@/components/forms/ContactForm';
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
      title: 'Contact Us | KSK Law Firm | NRI Legal Services',
      description:
        'Get in touch with KSK Law Firm for expert legal services. Contact High Court Advocate Kalanidhi Sanjeeva Kumar for NRI legal matters.',
      canonical: `${baseUrl}/${locale}/contact`,
      locale,
    },
    baseUrl
  );
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-h1 font-serif font-bold text-brand-primary mb-4 text-center">
          Contact Us
        </h1>
        <p className="text-body-lg text-text-secondary dark:text-dark-text-secondary text-center mb-12 max-w-2xl mx-auto">
          Have a question or need legal assistance? Get in touch with us. We're here to help.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div>
            <h2 className="text-h2 font-serif font-bold text-brand-primary mb-6">
              Send Us a Message
            </h2>
            <ContactForm />
          </div>

          <div>
            <h2 className="text-h2 font-serif font-bold text-brand-primary mb-6">
              Get in Touch
            </h2>
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-h4 font-serif font-bold text-brand-primary mb-2">
                    Phone
                  </h3>
                  <p className="text-body-md text-text-secondary dark:text-dark-text-secondary mb-2">
                    Available for calls and WhatsApp
                  </p>
                  <a
                    href="tel:+919440217782"
                    className="text-brand-secondary hover:text-brand-accent transition-colors font-medium text-body-lg"
                  >
                    +91 9440217782
                  </a>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-h4 font-serif font-bold text-brand-primary mb-2">
                    Office Address
                  </h3>
                  <p className="text-body-md text-text-secondary dark:text-dark-text-secondary">
                    Kalanidhi Sanjeeva Kumar
                    <br />
                    High Court Advocate
                    <br />
                    Hyderabad, Telangana, India
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-h4 font-serif font-bold text-brand-primary mb-2">
                    Consultation Hours
                  </h3>
                  <p className="text-body-md text-text-secondary dark:text-dark-text-secondary">
                    Available for consultations via:
                    <br />
                    • 30-Minute Audio Call (WhatsApp)
                    <br />
                    • Document Review Service
                    <br />
                    <br />
                    Book your consultation online 24/7
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <Card className="mb-12">
          <CardContent className="p-6">
            <h3 className="text-h4 font-serif font-bold text-brand-primary mb-4">
              Office Location
            </h3>
            <div className="aspect-video bg-surface-border dark:bg-dark-surface-border rounded-lg flex items-center justify-center">
              <p className="text-text-secondary dark:text-dark-text-secondary">
                Google Map will be embedded here
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
