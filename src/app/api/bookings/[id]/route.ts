import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

type RouteParams = {
  params: {
    id: string;
  };
};

/**
 * GET /api/bookings/[id]
 * Get a specific booking by ID
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const booking = await prisma.booking.findUnique({
      where: { id: params.id },
      include: {
        consultationType: true,
        user: true,
        payment: true,
      },
    });

    if (!booking) {
      return NextResponse.json(
        {
          success: false,
          error: 'Booking not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        booking: {
          id: booking.id,
          consultationId: booking.consultationTypeId,
          consultationType: booking.consultationType.name,
          clientName: booking.user.name,
          clientEmail: booking.user.email,
          clientTimezone: booking.user.timezone,
          startTime: booking.startTime.toISOString(),
          endTime: booking.endTime.toISOString(),
          status: booking.status.toLowerCase(),
          intakeNotes: booking.clientNotes,
          googleCalendarEventId: booking.googleCalendarEventId,
          payment: booking.payment
            ? {
                id: booking.payment.id,
                status: booking.payment.status.toLowerCase(),
                gateway: booking.payment.gateway,
                amount: Number(booking.payment.amount),
                currency: booking.payment.currency,
              }
            : null,
          createdAt: booking.createdAt.toISOString(),
        },
      },
    });
  } catch (error) {
    console.error('Error fetching booking:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch booking',
      },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/bookings/[id]
 * Update a booking (for rescheduling or cancellation)
 */
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const body = await request.json();
    const { status, startTime, endTime } = body;

    const updateData: {
      status?: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';
      startTime?: Date;
      endTime?: Date;
    } = {};

    if (status) {
      const upperStatus = status.toUpperCase();
      if (!['PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED'].includes(upperStatus)) {
        return NextResponse.json(
          {
            success: false,
            error: 'Invalid status',
          },
          { status: 400 }
        );
      }
      updateData.status = upperStatus as 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';
    }

    if (startTime) {
      updateData.startTime = new Date(startTime);
    }

    if (endTime) {
      updateData.endTime = new Date(endTime);
    }

    const booking = await prisma.booking.update({
      where: { id: params.id },
      data: updateData,
      include: {
        consultationType: true,
        user: true,
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        booking: {
          id: booking.id,
          status: booking.status.toLowerCase(),
          startTime: booking.startTime.toISOString(),
          endTime: booking.endTime.toISOString(),
        },
      },
    });
  } catch (error) {
    console.error('Error updating booking:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update booking',
      },
      { status: 500 }
    );
  }
}

