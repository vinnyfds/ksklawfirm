import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

const PAYPAL_API_BASE =
  process.env.PAYPAL_MODE === 'live'
    ? 'https://api-m.paypal.com'
    : 'https://api-m.sandbox.paypal.com';

/**
 * POST /api/payment/paypal
 * Creates a PayPal order for payment
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount, currency, bookingId } = body;

    if (!process.env.PAYPAL_CLIENT_ID || !process.env.PAYPAL_CLIENT_SECRET) {
      return NextResponse.json(
        {
          success: false,
          error: 'PayPal credentials not configured',
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

    // Create order
    const orderResponse = await fetch(`${PAYPAL_API_BASE}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [
          {
            reference_id: bookingId,
            description: `Consultation: ${booking.consultationType.name}`,
            amount: {
              currency_code: currency || 'USD',
              value: amount.toString(),
            },
          },
        ],
      }),
    });

    if (!orderResponse.ok) {
      throw new Error('Failed to create PayPal order');
    }

    const orderData = await orderResponse.json();

    // Store payment record
    await prisma.payment.create({
      data: {
        bookingId: bookingId,
        gateway: 'PAYPAL',
        gatewayOrderId: orderData.id,
        gatewayPaymentId: '', // Will be updated when payment is captured
        amount: amount,
        currency: currency || 'USD',
        status: 'PENDING',
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        orderId: orderData.id,
        gateway: 'PAYPAL',
        clientId: process.env.PAYPAL_CLIENT_ID,
        amount: parseFloat(orderData.purchase_units[0].amount.value),
        currency: orderData.purchase_units[0].amount.currency_code,
      },
    });
  } catch (error) {
    console.error('Error creating PayPal order:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create payment order',
      },
      { status: 500 }
    );
  }
}

