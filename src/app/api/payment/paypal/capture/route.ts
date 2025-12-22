import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

const PAYPAL_API_BASE =
  process.env.PAYPAL_MODE === 'live'
    ? 'https://api-m.paypal.com'
    : 'https://api-m.sandbox.paypal.com';

/**
 * POST /api/payment/paypal/capture
 * Captures a PayPal payment
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderId } = body;

    if (!process.env.PAYPAL_CLIENT_ID || !process.env.PAYPAL_CLIENT_SECRET) {
      return NextResponse.json(
        {
          success: false,
          error: 'PayPal credentials not configured',
        },
        { status: 500 }
      );
    }

    // Get access token
    const authResponse = await fetch(`${PAYPAL_API_BASE}/v1/oauth2/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(
          `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
        ).toString('base64')}`,
      },
      body: 'grant_type=client_credentials',
    });

    if (!authResponse.ok) {
      throw new Error('Failed to get PayPal access token');
    }

    const authData = await authResponse.json();
    const accessToken = authData.access_token;

    // Capture payment
    const captureResponse = await fetch(
      `${PAYPAL_API_BASE}/v2/checkout/orders/${orderId}/capture`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!captureResponse.ok) {
      throw new Error('Failed to capture PayPal payment');
    }

    const captureData = await captureResponse.json();

    // Find payment record
    const paymentRecord = await prisma.payment.findFirst({
      where: {
        gatewayOrderId: orderId,
        gateway: 'PAYPAL',
      },
      include: {
        booking: true,
      },
    });

    if (paymentRecord && captureData.status === 'COMPLETED') {
      // Update payment status
      await prisma.payment.update({
        where: { id: paymentRecord.id },
        data: {
          status: 'SUCCESS',
          gatewayPaymentId: captureData.purchase_units[0].payments.captures[0].id,
          paymentDetails: captureData,
        },
      });

      // Confirm booking
      await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/bookings/${paymentRecord.bookingId}/confirm`, {
        method: 'POST',
      });
    }

    return NextResponse.json({
      success: true,
      data: {
        status: captureData.status,
        paymentId: captureData.purchase_units[0].payments.captures[0]?.id,
      },
    });
  } catch (error) {
    console.error('Error capturing PayPal payment:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to capture payment',
      },
      { status: 500 }
    );
  }
}

