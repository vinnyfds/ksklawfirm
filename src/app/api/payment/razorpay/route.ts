import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import { prisma } from '@/lib/db';

/**
 * POST /api/payment/razorpay
 * Creates a Razorpay order for payment
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount, currency, bookingId } = body;

    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      return NextResponse.json(
        {
          success: false,
          error: 'Razorpay credentials not configured',
        },
        { status: 500 }
      );
    }

    // Verify booking exists
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: { consultationType: true },
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

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: Math.round(amount * 100), // Amount in paise
      currency: currency || 'INR',
      receipt: `receipt_booking_${bookingId}`,
      notes: {
        bookingId: bookingId,
      },
    };

    const order = await razorpay.orders.create(options);

    // Store payment record
    await prisma.payment.create({
      data: {
        bookingId: bookingId,
        gateway: 'RAZORPAY',
        gatewayOrderId: order.id,
        gatewayPaymentId: '', // Will be updated when payment is verified
        amount: amount,
        currency: currency || 'INR',
        status: 'PENDING',
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        orderId: order.id,
        keyId: process.env.RAZORPAY_KEY_ID,
        gateway: 'RAZORPAY',
        amount: Number(order.amount) / 100,
        currency: order.currency,
      },
    });
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create payment order',
      },
      { status: 500 }
    );
  }
}


