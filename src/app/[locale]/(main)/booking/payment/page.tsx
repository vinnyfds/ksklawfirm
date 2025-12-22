'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from '@/lib/navigation';
import { PaymentMethodSelector } from '@/components/booking/PaymentMethodSelector';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

type Booking = {
  id: string;
  consultationId: string;
  clientName: string;
  clientEmail: string;
  startTime: string;
  endTime: string;
};

type Consultation = {
  id: string;
  name: string;
  price: {
    amount: number;
    currency: string;
  };
};

export default function PaymentPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const bookingId = searchParams.get('bookingId');
  const gatewayParam = searchParams.get('gateway') as 'razorpay' | 'paypal' | null;

  const [booking, setBooking] = useState<Booking | null>(null);
  const [consultation, setConsultation] = useState<Consultation | null>(null);
  const [selectedGateway, setSelectedGateway] = useState<'razorpay' | 'paypal' | null>(
    gatewayParam
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!bookingId) {
      router.push('/booking');
      return;
    }

    fetch(`/api/bookings/${bookingId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setBooking(data.data.booking);
          fetch('/api/consultations')
            .then((res) => res.json())
            .then((consultData) => {
              if (consultData.success) {
                const found = consultData.data.consultations.find(
                  (c: Consultation) => c.id === data.data.booking.consultationId
                );
                setConsultation(found || null);
              }
            });
        } else {
          setError('Booking not found');
        }
      })
      .catch((err) => {
        console.error('Error fetching booking:', err);
        setError('Failed to load booking details');
      });
  }, [bookingId, router]);

  const handlePayment = async () => {
    if (!booking || !selectedGateway || !consultation) {
      setError('Please select a payment method');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const paymentResponse = await fetch(`/api/payment/${selectedGateway.toLowerCase()}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: consultation.price.amount,
          currency: consultation.price.currency,
          bookingId: booking.id,
        }),
      });

      const paymentData = await paymentResponse.json();

      if (paymentData.success) {
        if (selectedGateway === 'razorpay') {
          const options = {
            key: paymentData.data.keyId,
            amount: paymentData.data.amount * 100,
            currency: paymentData.data.currency,
            name: 'Kalanidhi Sanjeeva Kumar',
            description: consultation.name,
            order_id: paymentData.data.orderId,
            handler: async function (response: any) {
              const verifyResponse = await fetch('/api/payment/razorpay/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  bookingId: booking.id,
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                }),
              });

              const verifyData = await verifyResponse.json();
              if (verifyData.success) {
                router.push('/booking/success');
              } else {
                router.push('/booking/error');
              }
            },
            prefill: {
              name: booking.clientName,
              email: booking.clientEmail || '',
            },
            theme: {
              color: '#F39C12',
            },
          };

          const razorpay = (window as any).Razorpay;
          if (razorpay) {
            const rzp = new razorpay(options);
            rzp.open();
          } else {
            setError('Razorpay SDK not loaded');
          }
        } else if (selectedGateway === 'paypal') {
          const paypal = (window as any).paypal;
          if (paypal) {
            paypal
              .Buttons({
                createOrder: async () => {
                  return paymentData.data.orderId;
                },
                onApprove: async (data: any, actions: any) => {
                  const captureResponse = await fetch('/api/payment/paypal/capture', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      orderId: data.orderID,
                    }),
                  });

                  const captureData = await captureResponse.json();
                  if (captureData.success) {
                    router.push('/booking/success');
                  } else {
                    router.push('/booking/error');
                  }
                },
                onError: () => {
                  router.push('/booking/error');
                },
              })
              .render('#paypal-button-container');
          } else {
            setError('PayPal SDK not loaded');
          }
        }
      } else {
        setError(paymentData.error || 'Failed to create payment order');
      }
    } catch (err) {
      console.error('Payment error:', err);
      setError('An error occurred during payment');
    } finally {
      setIsLoading(false);
    }
  };

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Booking', href: '/booking' },
    { label: 'Payment', href: '/booking/payment' },
  ];

  if (!booking || !consultation) {
    return (
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-2xl mx-auto text-center">
          {error ? (
            <p className="text-feedback-error">{error}</p>
          ) : (
            <p className="text-text-secondary dark:text-dark-text-secondary">Loading...</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="max-w-2xl mx-auto">
        <Breadcrumbs items={breadcrumbs} />

        <h1 className="text-h1 font-serif font-bold text-brand-primary mb-4 text-center">
          Complete Payment
        </h1>

        {error && (
          <Card className="mb-6 border-feedback-error bg-feedback-error/10">
            <CardContent className="p-4">
              <p className="text-feedback-error">{error}</p>
            </CardContent>
          </Card>
        )}

        <Card className="mb-6">
          <CardContent className="p-6">
            <h2 className="text-h2 font-serif font-bold text-brand-primary mb-4">
              Booking Summary
            </h2>
            <div className="space-y-2 text-body-md">
              <p>
                <strong>Consultation:</strong> {consultation.name}
              </p>
              <p>
                <strong>Date & Time:</strong>{' '}
                {new Date(booking.startTime).toLocaleString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: '2-digit',
                })}
              </p>
            </div>
          </CardContent>
        </Card>

        {!selectedGateway && (
          <PaymentMethodSelector
            selectedMethod={selectedGateway}
            onSelect={setSelectedGateway}
            amount={consultation.price.amount}
            currency={consultation.price.currency}
          />
        )}

        {selectedGateway && (
          <div className="space-y-4">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-h3 font-serif font-bold text-brand-primary mb-4">
                  Selected Payment Method: {selectedGateway}
                </h3>
                <div className="mb-6 p-4 bg-surface-ground dark:bg-dark-surface-ground rounded-md">
                  <div className="flex justify-between items-center">
                    <span className="text-body-md font-medium">Total Amount:</span>
                    <span className="text-h3 font-bold text-brand-primary">
                      {new Intl.NumberFormat('en-IN', {
                        style: 'currency',
                        currency: consultation.price.currency,
                      }).format(consultation.price.amount)}
                    </span>
                  </div>
                </div>

                {selectedGateway === 'paypal' && (
                  <div id="paypal-button-container" className="mb-4"></div>
                )}

                {selectedGateway === 'razorpay' && (
                  <Button onClick={handlePayment} disabled={isLoading} size="lg" className="w-full">
                    {isLoading ? 'Processing...' : 'Proceed with Razorpay'}
                  </Button>
                )}

                <Button
                  variant="outline"
                  onClick={() => setSelectedGateway(null)}
                  className="w-full mt-4"
                >
                  Change Payment Method
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
