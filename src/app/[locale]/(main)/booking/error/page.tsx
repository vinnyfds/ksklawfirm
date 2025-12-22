import { Link } from '@/lib/navigation';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';

export default function BookingErrorPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-6">
          <div className="w-20 h-20 bg-feedback-error rounded-full flex items-center justify-center mx-auto mb-4">
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <h1 className="text-h1 font-serif font-bold text-brand-primary mb-4">
            Payment Failed
          </h1>
          <p className="text-body-lg text-text-secondary dark:text-dark-text-secondary mb-8">
            We're sorry, but your payment could not be processed. Please try again or contact us
            for assistance.
          </p>
        </div>

        <Card className="mb-8">
          <CardContent className="p-8">
            <h2 className="text-h2 font-serif font-bold text-brand-primary mb-4">
              What You Can Do
            </h2>
            <div className="text-left space-y-4 text-body-md text-text-secondary dark:text-dark-text-secondary">
              <p>
                <strong>1. Try Again:</strong> You can attempt the payment again by going back to
                the booking page.
              </p>
              <p>
                <strong>2. Check Payment Details:</strong> Ensure your payment method has
                sufficient funds and is valid.
              </p>
              <p>
                <strong>3. Contact Us:</strong> If the problem persists, please contact us
                directly at{' '}
                <a href="tel:+919440217782" className="text-brand-secondary hover:underline">
                  +91 9440217782
                </a>{' '}
                for assistance.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/booking">Try Again</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
