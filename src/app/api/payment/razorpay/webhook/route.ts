import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyRazorpaySignature } from '@/lib/razorpay';

/**
 * POST /api/payment/razorpay/webhook
 * Handles Razorpay webhook events
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { event, payload } = body;

    // Verify webhook signature (if configured)
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
    if (webhookSecret) {
      const signature = request.headers.get('x-razorpay-signature');
      if (!signature) {
        return NextResponse.json(
          {
            success: false,
            error: 'Missing signature',
          },
          { status: 401 }
        );
      }

      // Verify webhook signature
      const crypto = require('crypto');
      const expectedSignature = crypto
        .createHmac('sha256', webhookSecret)
        .update(JSON.stringify(body))
        .digest('hex');

      if (signature !== expectedSignature) {
        return NextResponse.json(
          {
            success: false,
            error: 'Invalid signature',
          },
          { status: 401 }
        );
      }
    }

    // Handle payment success event
    if (event === 'payment.captured') {
      const payment = payload.payment.entity;
      const orderId = payment.order_id;

      // Find payment record
      const paymentRecord = await prisma.payment.findFirst({
        where: {
          gatewayOrderId: orderId,
          gateway: 'RAZORPAY',
        },
        include: {
          booking: true,
        },
      });

      if (paymentRecord) {
        // Verify signature
        const isValid = verifyRazorpaySignature(
          orderId,
          payment.id,
          payment.signature || ''
        );

        if (isValid) {
          // Update payment status
          await prisma.payment.update({
            where: { id: paymentRecord.id },
            data: {
              status: 'SUCCESS',
              gatewayPaymentId: payment.id,
              paymentDetails: payload,
            },
          });

          // Confirm booking
          await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/bookings/${paymentRecord.bookingId}/confirm`, {
            method: 'POST',
          });
        }
      }
    }

    // Handle payment failure event
    if (event === 'payment.failed') {
      const payment = payload.payment.entity;
      const orderId = payment.order_id;

      const paymentRecord = await prisma.payment.findFirst({
        where: {
          gatewayOrderId: orderId,
          gateway: 'RAZORPAY',
        },
      });

      if (paymentRecord) {
        await prisma.payment.update({
          where: { id: paymentRecord.id },
          data: {
            status: 'FAILED',
            gatewayPaymentId: payment.id,
            paymentDetails: payload,
          },
        });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error processing Razorpay webhook:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Webhook processing failed',
      },
      { status: 500 }
    );
  }
}

