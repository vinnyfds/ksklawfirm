import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { createCalendarEvent } from '@/lib/google-calendar';
import { sendBookingConfirmation } from '@/lib/email';

/**
 * POST /api/bookings/[id]/confirm
 * Confirm a booking after successful payment
 * Creates calendar event and sends confirmation email
 */
export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const booking = await prisma.booking.findUnique({
      where: { id: params.id },
      include: {
        user: true,
        consultationType: true,
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

    if (booking.status !== 'PENDING') {
      return NextResponse.json(
        {
          success: false,
          error: 'Booking is not in pending status',
        },
        { status: 400 }
      );
    }

    // Update booking status to CONFIRMED
    const updatedBooking = await prisma.booking.update({
      where: { id: params.id },
      data: {
        status: 'CONFIRMED',
      },
      include: {
        user: true,
        consultationType: true,
      },
    });

    // Create Google Calendar event
    let calendarEventId: string | null = null;
    try {
      const calendarEvent = await createCalendarEvent({
        startTime: updatedBooking.startTime.toISOString(),
        endTime: updatedBooking.endTime.toISOString(),
        clientEmail: updatedBooking.user.email || '',
        clientName: updatedBooking.user.name || 'Client',
        bookingId: updatedBooking.id,
      });
      calendarEventId = calendarEvent.id || null;

      // Update booking with calendar event ID
      if (calendarEventId) {
        await prisma.booking.update({
          where: { id: params.id },
          data: {
            googleCalendarEventId: calendarEventId,
          },
        });
      }
    } catch (error) {
      console.error('Failed to create calendar event:', error);
      // Don't fail the entire process if calendar creation fails
    }

    // Send confirmation email
    try {
      const documentUploadLink = `${process.env.NEXT_PUBLIC_SITE_URL}/portal/upload?token=${updatedBooking.id}`; // TODO: Generate secure token

      await sendBookingConfirmation({
        clientEmail: updatedBooking.user.email || '',
        clientName: updatedBooking.user.name || 'Client',
        appointmentDate: updatedBooking.startTime.toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
        appointmentTime: updatedBooking.startTime.toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
        }),
        timezone: updatedBooking.user.timezone,
        bookingId: updatedBooking.id,
        documentUploadLink,
      });
    } catch (error) {
      console.error('Failed to send confirmation email:', error);
      // Don't fail the entire process if email fails
    }

    return NextResponse.json({
      success: true,
      data: {
        booking: {
          id: updatedBooking.id,
          status: updatedBooking.status.toLowerCase(),
          calendarEventId,
        },
      },
    });
  } catch (error) {
    console.error('Error confirming booking:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to confirm booking',
      },
      { status: 500 }
    );
  }
}

