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
      title: 'Booking Successful | KSK Law Firm',
      description:
        'Your consultation booking has been confirmed. You will receive a confirmation email shortly with all the details.',
      canonical: `${baseUrl}/${locale}/booking/success`,
      locale,
      noindex: true, // Don't index success pages
    },
    baseUrl
  );
}

export default async function BookingSuccessPage({ params }: Props) {
  const { locale } = await params;
  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-6">
          <div className="w-20 h-20 bg-feedback-success rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-12 h-12 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-h1 font-serif font-bold text-brand-primary mb-4">
            Payment Successful!
          </h1>
          <p className="text-body-lg text-text-secondary dark:text-dark-text-secondary mb-8">
            Your consultation has been confirmed. You will receive a confirmation email shortly
            with all the details.
          </p>
        </div>

        <Card className="mb-8">
          <CardContent className="p-8">
            <h2 className="text-h2 font-serif font-bold text-brand-primary mb-4">
              What's Next?
            </h2>
            <div className="text-left space-y-4 text-body-md text-text-secondary dark:text-dark-text-secondary">
              <p>
                <strong>1. Check Your Email:</strong> You'll receive a confirmation email with your
                appointment details, including the date and time in your timezone and IST.
              </p>
              <p>
                <strong>2. WhatsApp Contact:</strong> Mr. Kumar will contact you via WhatsApp
                audio call at the scheduled time on the phone number you provided.
              </p>
              <p>
                <strong>3. Upload Documents:</strong> You can securely upload any relevant
                documents using the link provided in your confirmation email.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/">Return to Home</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/booking">Book Another Consultation</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
