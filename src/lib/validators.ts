import { z } from 'zod';

/**
 * Validation schemas using Zod
 * These schemas are used for both client-side and server-side validation
 */

export const bookingSchema = z.object({
  consultationId: z.string().min(1, 'Consultation type is required'),
  startTime: z.string().datetime('Invalid date format'),
  client: z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
    phone: z.string().optional(),
    timezone: z.string().min(1, 'Timezone is required'),
  }),
  intakeNotes: z.string().optional(),
  paymentGateway: z.enum(['Razorpay', 'PayPal']).optional(),
});

export const availabilityQuerySchema = z.object({
  consultationId: z.string().min(1),
  year: z.coerce.number().int().min(2020).max(2100),
  month: z.coerce.number().int().min(1).max(12),
  timezone: z.string().min(1),
});

export const paymentVerificationSchema = z.object({
  bookingId: z.string().min(1),
  gateway: z.enum(['Razorpay', 'PayPal']),
  gatewayResponse: z.record(z.any()),
});

export type BookingInput = z.infer<typeof bookingSchema>;
export type AvailabilityQuery = z.infer<typeof availabilityQuerySchema>;
export type PaymentVerification = z.infer<typeof paymentVerificationSchema>;

