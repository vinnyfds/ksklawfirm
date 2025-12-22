/**
 * Shared TypeScript types and interfaces
 */

export type Consultation = {
  id: string;
  name: string;
  description: string;
  durationMinutes: number;
  price: {
    amount: number;
    currency: string;
  };
};

export type AvailabilitySlot = {
  startTime: string; // ISO 8601 format
  endTime: string; // ISO 8601 format
};

export type Booking = {
  id: string;
  consultationId: string;
  clientName: string;
  clientEmail: string;
  clientTimezone: string;
  startTime: string;
  endTime: string;
  status: 'pending_payment' | 'confirmed' | 'completed' | 'cancelled';
  intakeNotes?: string;
  meetingLink?: string;
  createdAt: string;
};

export type PaymentOrder = {
  orderId: string;
  gateway: 'Razorpay' | 'PayPal';
  amount: number;
  currency: string;
};

export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

