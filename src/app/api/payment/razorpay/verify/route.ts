import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyRazorpaySignature } from '@/lib/razorpay';

/**
 * POST /api/payment/razorpay/verify
 * Verifies Razorpay payment signature and confirms booking
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { bookingId, razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

    if (!bookingId || !razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required payment details',
        },
        { status: 400 }
      );
    }

    // Verify signature
    const isValid = verifyRazorpaySignature(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    );

    if (!isValid) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid payment signature',
        },
        { status: 400 }
      );
    }

    // Find payment record
    const paymentRecord = await prisma.payment.findFirst({
      where: {
        gatewayOrderId: razorpay_order_id,
        gateway: 'RAZORPAY',
      },
      include: {
        booking: true,
      },
    });

    if (!paymentRecord) {
      return NextResponse.json(
        {
          success: false,
          error: 'Payment record not found',
        },
        { status: 404 }
      );
    }

    // Update payment status
    await prisma.payment.update({
      where: { id: paymentRecord.id },
      data: {
        status: 'SUCCESS',
        gatewayPaymentId: razorpay_payment_id,
      },
    });

    // Confirm booking
    await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/bookings/${bookingId}/confirm`, {
      method: 'POST',
    });

    return NextResponse.json({
      success: true,
      data: {
        bookingId,
        paymentId: razorpay_payment_id,
      },
    });
  } catch (error) {
    console.error('Error verifying Razorpay payment:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to verify payment',
      },
      { status: 500 }
    );
  }
}

