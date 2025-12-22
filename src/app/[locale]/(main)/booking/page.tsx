'use client';

import { useState, useEffect } from 'react';
import { useRouter } from '@/lib/navigation';
import { ServiceSelector } from '@/components/booking/ServiceSelector';
import { TimezoneSelector } from '@/components/booking/TimezoneSelector';
import { BookingCalendar } from '@/components/booking/BookingCalendar';
import { TimeSlotPicker } from '@/components/booking/TimeSlotPicker';
import { BookingStepper } from '@/components/booking/BookingStepper';
import { BookingForm } from '@/components/booking/BookingForm';
import { ReservationTimer } from '@/components/booking/ReservationTimer';
import { PaymentMethodSelector } from '@/components/booking/PaymentMethodSelector';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { getUserTimezone, formatDualTimezone } from '@/lib/utils';
import { format, addDays } from 'date-fns';

type Consultation = {
  id: string;
  name: string;
  description: string;
  durationMinutes: number;
  price: {
    amount: number;
    currency: string;
  };
};

type AvailabilitySlot = {
  startTime: string;
  endTime: string;
};

type BookingFormData = {
  name: string;
  email: string;
  phone: string;
  country: string;
  legalMatter: string;
};

const STEPS = [
  { id: 'service', label: 'Service', description: 'Select consultation type' },
  { id: 'date', label: 'Date & Time', description: 'Choose your slot' },
  { id: 'details', label: 'Details', description: 'Provide information' },
  { id: 'review', label: 'Review', description: 'Confirm booking' },
];

export default function BookingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [selectedConsultation, setSelectedConsultation] = useState<string | null>(null);
  const [selectedPaymentGateway, setSelectedPaymentGateway] = useState<'Razorpay' | 'PayPal' | null>(null);
  const [timezone, setTimezone] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [availableSlots, setAvailableSlots] = useState<AvailabilitySlot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<AvailabilitySlot | null>(null);
  const [formData, setFormData] = useState<BookingFormData | null>(null);
  const [reservationExpiresAt, setReservationExpiresAt] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingConsultations, setIsLoadingConsultations] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setTimezone(getUserTimezone());
    }
  }, []);

  useEffect(() => {
    setIsLoadingConsultations(true);
    setError(null);
    fetch('/api/consultations')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setConsultations(data.data.consultations);
          if (data.data.consultations.length === 0) {
            setError('No consultation types available. Please contact us directly.');
          }
        } else {
          setError(data.error || 'Failed to load consultation types');
        }
      })
      .catch((err) => {
        console.error('Failed to fetch consultations:', err);
        setError('Failed to load consultation types. Please try again later.');
      })
      .finally(() => {
        setIsLoadingConsultations(false);
      });
  }, []);

  useEffect(() => {
    if (selectedDate && timezone) {
      setIsLoading(true);
      const startDate = new Date(selectedDate);
      startDate.setHours(0, 0, 0, 0);
      const endDate = addDays(startDate, 30);

      fetch(
        `/api/availability?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}&timezone=${timezone}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setAvailableSlots(data.data.slots || []);
          }
        })
        .catch((err) => {
          console.error('Failed to fetch availability:', err);
          setError('Failed to load available slots');
        })
        .finally(() => setIsLoading(false));
    }
  }, [selectedDate, timezone]);

  useEffect(() => {
    if (step === 1 && timezone) {
      setIsLoading(true);
      const startDate = new Date();
      startDate.setHours(0, 0, 0, 0);
      const endDate = addDays(startDate, 60);

      fetch(
        `/api/availability?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}&timezone=${timezone}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setAvailableSlots(data.data.slots || []);
          }
        })
        .catch((err) => {
          console.error('Failed to fetch initial availability:', err);
        })
        .finally(() => setIsLoading(false));
    }
  }, [step, timezone]);

  const handleServiceSelect = (id: string) => {
    setSelectedConsultation(id);
    setStep(1);
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setSelectedSlot(null);
  };

  const handleSlotSelect = (slot: AvailabilitySlot) => {
    setSelectedSlot(slot);
  };

  const handleFormSubmit = (data: BookingFormData) => {
    setFormData(data);
    setStep(3);
  };

  const handleBookingSubmit = async () => {
    if (!selectedConsultation || !selectedSlot || !formData) {
      setError('Please complete all steps');
      return;
    }

    if (!selectedPaymentGateway) {
      setError('Please select a payment method');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const bookingResponse = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          consultationId: selectedConsultation,
          startTime: selectedSlot.startTime,
          client: {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            timezone: timezone,
          },
          intakeNotes: formData.legalMatter,
          paymentGateway: selectedPaymentGateway,
        }),
      });

      const bookingData = await bookingResponse.json();

      if (bookingData.success) {
        setReservationExpiresAt(bookingData.data.booking.reservationExpiresAt);
        router.push(`/booking/payment?bookingId=${bookingData.data.booking.id}&gateway=${selectedPaymentGateway}`);
      } else {
        setError(bookingData.error || 'Failed to create booking');
      }
    } catch (err) {
      console.error('Booking error:', err);
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const slotsForSelectedDate = selectedDate
    ? availableSlots.filter((slot) => {
        const slotDate = new Date(slot.startTime);
        return format(slotDate, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd');
      })
    : [];

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-h1 font-serif font-bold text-brand-primary mb-4 text-center">
          Book a Consultation
        </h1>
        <p className="text-body-md text-text-secondary dark:text-dark-text-secondary text-center mb-8">
          Select your preferred consultation type, date, and time. We'll handle the rest.
        </p>

        <BookingStepper steps={STEPS} currentStep={step} />

        {error && (
          <Card className="mb-6 border-feedback-error bg-feedback-error/10">
            <CardContent className="p-4">
              <p className="text-feedback-error">{error}</p>
            </CardContent>
          </Card>
        )}

        {reservationExpiresAt && (
          <ReservationTimer
            expiresAt={reservationExpiresAt}
            onExpire={() => {
              setReservationExpiresAt(null);
              setError('Your reservation has expired. Please select a new slot.');
            }}
          />
        )}

        {step === 0 && (
          <ServiceSelector
            consultations={consultations}
            selectedId={selectedConsultation}
            onSelect={handleServiceSelect}
            isLoading={isLoadingConsultations}
          />
        )}

        {step === 1 && (
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <label className="block text-body-sm font-medium mb-2">
                  Your Timezone
                </label>
                <TimezoneSelector value={timezone} onChange={setTimezone} />
              </CardContent>
            </Card>

            <BookingCalendar
              selectedDate={selectedDate}
              onDateSelect={handleDateSelect}
              availableSlots={availableSlots}
              timezone={timezone}
            />

            {selectedDate && (
              <div className="mt-6">
                {isLoading ? (
                  <Card>
                    <CardContent className="p-6 text-center">
                      <p className="text-text-secondary dark:text-dark-text-secondary">
                        Loading available slots...
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  <TimeSlotPicker
                    slots={slotsForSelectedDate}
                    selectedSlot={selectedSlot}
                    onSelect={handleSlotSelect}
                    timezone={timezone}
                  />
                )}
              </div>
            )}

            {selectedSlot && (
              <div className="flex gap-4">
                <Button variant="outline" onClick={() => setStep(0)}>
                  Back
                </Button>
                <Button onClick={() => setStep(2)}>Continue</Button>
              </div>
            )}
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <BookingForm onSubmit={handleFormSubmit} isSubmitting={isLoading} />
            <Button variant="outline" onClick={() => setStep(1)}>
              Back
            </Button>
          </div>
        )}

        {step === 3 && selectedConsultation && selectedSlot && formData && (
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-h2 font-serif font-bold text-brand-primary mb-6">
                  Review Your Booking
                </h2>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-h4 font-bold mb-2">Consultation Type</h3>
                    <p className="text-body-md">
                      {consultations.find((c) => c.id === selectedConsultation)?.name}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-h4 font-bold mb-2">Date & Time</h3>
                    <p className="text-body-md">
                      {formatDualTimezone(selectedSlot.startTime, timezone).userTime}
                    </p>
                    <p className="text-body-sm text-text-secondary dark:text-dark-text-secondary">
                      IST: {formatDualTimezone(selectedSlot.startTime, timezone).istTime}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-h4 font-bold mb-2">Your Details</h3>
                    <p className="text-body-md">{formData.name}</p>
                    <p className="text-body-md">{formData.email}</p>
                    {formData.phone && <p className="text-body-md">{formData.phone}</p>}
                  </div>
                </div>
              </CardContent>
            </Card>

            {!selectedPaymentGateway && (
              <PaymentMethodSelector
                selectedMethod={null}
                onSelect={(method) => {
                  if (method === 'razorpay') {
                    setSelectedPaymentGateway('Razorpay');
                  } else if (method === 'paypal') {
                    setSelectedPaymentGateway('PayPal');
                  }
                }}
                amount={consultations.find((c) => c.id === selectedConsultation)?.price.amount || 0}
                currency={consultations.find((c) => c.id === selectedConsultation)?.price.currency || 'INR'}
              />
            )}

            {selectedPaymentGateway && (
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-h4 font-bold">Payment Method</h3>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedPaymentGateway(null)}
                    >
                      Change
                    </Button>
                  </div>
                  <p className="text-body-md">{selectedPaymentGateway}</p>
                </CardContent>
              </Card>
            )}

            <div className="flex gap-4">
              <Button variant="outline" onClick={() => setStep(2)}>
                Back
              </Button>
              <Button onClick={handleBookingSubmit} disabled={isLoading || !selectedPaymentGateway} size="lg">
                {isLoading ? 'Processing...' : 'Confirm & Proceed to Payment'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
