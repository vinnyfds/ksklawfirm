import { NextRequest, NextResponse } from 'next/server';
import { bookingSchema } from '@/lib/validators';
import { prisma } from '@/lib/db';

/**
 * POST /api/bookings
 * Creates a new booking request with temporary slot reservation
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = bookingSchema.parse(body);

    // Get consultation type to determine duration
    const consultationType = await prisma.consultationType.findUnique({
      where: { id: validatedData.consultationId },
    });

    if (!consultationType) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid consultation type',
        },
        { status: 400 }
      );
    }

    // Check if slot is still available (not booked by another user)
    const conflictingBooking = await prisma.booking.findFirst({
      where: {
        startTime: new Date(validatedData.startTime),
        status: {
          in: ['PENDING', 'CONFIRMED'],
        },
      },
    });

    if (conflictingBooking) {
      return NextResponse.json(
        {
          success: false,
          error: 'This time slot is no longer available',
        },
        { status: 409 }
      );
    }

    // Create or find user
    const user = await prisma.user.upsert({
      where: { email: validatedData.client.email },
      update: {
        name: validatedData.client.name,
        phone: validatedData.client.phone,
        timezone: validatedData.client.timezone,
      },
      create: {
        email: validatedData.client.email,
        name: validatedData.client.name,
        phone: validatedData.client.phone,
        timezone: validatedData.client.timezone,
      },
    });

    // Calculate end time based on consultation duration
    const startTime = new Date(validatedData.startTime);
    const endTime = new Date(
      startTime.getTime() + consultationType.durationMinutes * 60 * 1000
    );

    // Create booking with PENDING status (reserved for 15 minutes)
    const booking = await prisma.booking.create({
      data: {
        userId: user.id,
        consultationTypeId: validatedData.consultationId,
        startTime,
        endTime,
        status: 'PENDING',
        clientNotes: validatedData.intakeNotes,
      },
      include: {
        consultationType: true,
        user: true,
      },
    });

    // Create payment record if payment gateway is provided
    let paymentRecord = null;
    if (validatedData.paymentGateway) {
      paymentRecord = await prisma.payment.create({
        data: {
          bookingId: booking.id,
          gateway: validatedData.paymentGateway.toUpperCase() as 'RAZORPAY' | 'PAYPAL',
          amount: consultationType.price,
          currency: consultationType.currency,
          status: 'PENDING',
          gatewayPaymentId: '', // Will be updated when payment is processed
        },
      });
    }

    return NextResponse.json(
      {
        success: true,
        data: {
          booking: {
            id: booking.id,
            consultationId: booking.consultationTypeId,
            clientName: booking.user.name,
            clientEmail: booking.user.email,
            clientTimezone: booking.user.timezone,
            startTime: booking.startTime.toISOString(),
            endTime: booking.endTime.toISOString(),
            status: booking.status.toLowerCase(),
            intakeNotes: booking.clientNotes,
            createdAt: booking.createdAt.toISOString(),
            reservationExpiresAt: new Date(Date.now() + 15 * 60 * 1000).toISOString(), // 15 minutes from now
          },
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create booking',
      },
      { status: 400 }
    );
  }
}

