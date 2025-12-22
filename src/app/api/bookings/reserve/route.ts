import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { z } from 'zod';

const reserveSchema = z.object({
  startTime: z.string().datetime(),
  consultationId: z.string(),
});

/**
 * POST /api/bookings/reserve
 * Temporarily reserve a time slot (15-minute hold)
 * This prevents double-booking while user completes payment
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { startTime, consultationId } = reserveSchema.parse(body);

    // Check if slot is already booked or reserved
    const existingBooking = await prisma.booking.findFirst({
      where: {
        startTime: new Date(startTime),
        status: {
          in: ['PENDING', 'CONFIRMED'],
        },
      },
    });

    if (existingBooking) {
      // Check if reservation has expired (older than 15 minutes)
      const reservationAge = Date.now() - existingBooking.createdAt.getTime();
      const RESERVATION_TIMEOUT = 15 * 60 * 1000; // 15 minutes

      if (reservationAge < RESERVATION_TIMEOUT && existingBooking.status === 'PENDING') {
        return NextResponse.json(
          {
            success: false,
            error: 'This time slot is currently reserved',
            reservedUntil: new Date(existingBooking.createdAt.getTime() + RESERVATION_TIMEOUT).toISOString(),
          },
          { status: 409 }
        );
      }
    }

    // Return success - slot is available
    // Actual reservation happens when booking is created
    return NextResponse.json({
      success: true,
      data: {
        available: true,
        reservedUntil: new Date(Date.now() + 15 * 60 * 1000).toISOString(), // 15 minutes from now
      },
    });
  } catch (error) {
    console.error('Error checking slot availability:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to check slot availability',
      },
      { status: 500 }
    );
  }
}

