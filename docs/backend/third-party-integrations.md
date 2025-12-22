Here is the comprehensive Third-Party Integrations document.

---

```markdown
# Third-Party Integrations Documentation

**Document Type:** Third-Party Integrations
**Category:** Backend
**Project:** Lawyers Website (Kalanidhi Sanjeeva Kumar)
**Author:** Technical Writer
**Version:** 1.0
**Date:** 2023-10-27

## Introduction

This document provides a comprehensive technical guide for implementing the essential third-party integrations required for the Kalanidhi Sanjeeva Kumar advocate website. The backend, built on Node.js with Express, will handle all server-side logic for these integrations. The primary goal is to create a seamless experience for NRI clients, from booking and payment to scheduling and confirmation.

This documentation details the implementation, data flow, and error handling for the following services:

1.  **Payment Gateways:** Razorpay and PayPal for processing international and domestic payments for consultations.
2.  **Calendar Synchronization:** Google Calendar for real-time availability management and automated event creation.
3.  **Messaging & Notifications:** WhatsApp (via Twilio) for sending booking confirmations.

All API keys, secrets, and sensitive credentials must be managed using environment variables and Vercel's secret management for production. They must never be committed to the repository.

---

## 1. Payment Gateway Integration (Razorpay & PayPal)

To cater to a global NRI audience and ensure robust payment processing, the website will integrate two payment gateways. Razorpay will be the primary gateway, supporting a wide range of international cards and UPI. PayPal will serve as a trusted alternative for international clients.

### 1.1. Razorpay Integration

Razorpay is chosen for its strong support for international transactions and comprehensive developer APIs.

#### 1.1.1. Environment Variables

Store the following keys obtained from the Razorpay dashboard in your environment file (`.env` or Vercel environment variables).

```
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

#### 1.1.2. Data Flow: Booking & Payment

The payment process is initiated from the frontend and verified on the backend to ensure security.

1.  **Order Creation (Client -> Frontend -> Backend):**
    *   A client selects a consultation type (e.g., "30-minute Audio Call") and proceeds to payment on the `/booking` page.
    *   The Next.js frontend sends a POST request to our backend endpoint (`/api/payment/create-order`) with the `amount` and `currency`.
    *   The backend uses the Razorpay Node.js SDK to create an order. The `receipt` ID should be linked to a unique booking record created in our PostgreSQL database with a `PENDING` status.

    ```javascript
    // src/pages/api/payment/create-order.js (Illustrative Express Route)
    import Razorpay from 'razorpay';
    import { prisma } from '../../../lib/prisma'; // Prisma client instance

    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    export default async function handler(req, res) {
      if (req.method === 'POST') {
        const { amount, currency, bookingId } = req.body; // bookingId links to the pending booking

        const options = {
          amount: amount * 100, // Amount in the smallest currency unit (e.g., paise)
          currency,
          receipt: `receipt_booking_${bookingId}`,
        };

        try {
          const order = await instance.orders.create(options);
          res.status(200).json({ success: true, order });
        } catch (error) {
          console.error('Razorpay order creation failed:', error);
          res.status(500).json({ success: false, message: 'Could not create payment order.' });
        }
      }
    }
    ```

2.  **Checkout (Frontend):**
    *   The backend returns the `order_id` to the frontend.
    *   The frontend uses this `order_id` to initialize the Razorpay Checkout modal.

3.  **Payment Verification (Frontend -> Backend):**
    *   Upon successful payment, Razorpay's callback provides the frontend with `razorpay_payment_id`, `razorpay_order_id`, and `razorpay_signature`.
    *   The frontend immediately sends these details to a backend verification endpoint (`/api/payment/verify-signature`). **This server-side verification is critical and mandatory.**

#### 1.1.3. Server-Side Signature Verification

To confirm the payment is authentic, the signature must be regenerated on the server using the secret key and compared with the one provided by Razorpay.

```javascript
// src/pages/api/payment/verify-signature.js
import crypto from 'crypto';
import { prisma } from '../../../lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { order_id, payment_id, signature, bookingId } = req.body;

    const body = order_id + '|' + payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest('hex');

    if (expectedSignature === signature) {
      // Signature is valid. Update booking status in the database.
      await prisma.booking.update({
        where: { id: bookingId },
        data: {
          status: 'CONFIRMED',
          paymentId: payment_id,
          paymentGateway: 'RAZORPAY',
        },
      });

      // --- TRIGGER GOOGLE CALENDAR & WHATSAPP INTEGRATIONS HERE ---

      res.status(200).json({ success: true, message: 'Payment verified successfully.' });
    } else {
      // Signature is invalid.
      res.status(400).json({ success: false, message: 'Invalid payment signature.' });
    }
  }
}
```

#### 1.1.4. Error Handling (Razorpay)

*   **Order Creation Failure:** The backend will log the error from the Razorpay SDK and return a `500` status to the frontend. The UI should display a generic "Could not initiate payment. Please try again." message.
*   **Payment Failure (Client-Side):** The Razorpay Checkout `handler` provides an error object. The UI should inform the user that their payment failed.
*   **Signature Verification Failure:** The backend returns a `400` status. Log this event as a potential security issue. The booking status in the database remains `PENDING`. Do not confirm the appointment.

### 1.2. PayPal Integration

PayPal is a well-known alternative for international clients. The integration will use the PayPal REST API.

#### 1.2.1. Environment Variables

```
PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_CLIENT_SECRET=your_paypal_client_secret
PAYPAL_API_BASE=https://api-m.sandbox.paypal.com # Use https://api-m.paypal.com for production
```

#### 1.2.2. Data Flow: Server-Side Orders V2

1.  **Create Order (Backend):** The frontend requests an order from `/api/paypal/create-order`. The backend communicates with the PayPal API to create an order and returns the `orderID` to the frontend.
2.  **Render Buttons (Frontend):** The frontend uses the PayPal JS SDK to render the payment buttons.
3.  **Capture Order (Backend):** When the user approves the payment in the PayPal popup, the `onApprove` function on the frontend calls our backend endpoint (`/api/paypal/capture-order`) with the `orderID`. The backend then tells PayPal to capture the funds.

#### 1.2.3. Server-Side Capture & Verification

The capture step finalizes the transaction and serves as server-side verification.

```javascript
// src/pages/api/paypal/capture-order.js (Illustrative)
import { prisma } from '../../../lib/prisma';
// A helper function to get an access token from PayPal would be needed
import { getPayPalAccessToken } from '../../../lib/paypal';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { orderID, bookingId } = req.body;
    const accessToken = await getPayPalAccessToken();

    const response = await fetch(`${process.env.PAYPAL_API_BASE}/v2/checkout/orders/${orderID}/capture`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();

    if (data.status === 'COMPLETED') {
      await prisma.booking.update({
        where: { id: bookingId },
        data: {
          status: 'CONFIRMED',
          paymentId: data.id, // The PayPal transaction ID
          paymentGateway: 'PAYPAL',
        },
      });

      // --- TRIGGER GOOGLE CALENDAR & WHATSAPP INTEGRATIONS HERE ---

      res.status(200).json({ success: true, data });
    } else {
      res.status(400).json({ success: false, message: 'PayPal payment capture failed.', details: data });
    }
  }
}
```

---

## 2. Google Calendar Integration

This integration provides two-way synchronization: fetching the advocate's real-time availability and automatically creating a calendar event upon a successful booking. We will use a **Service Account** for server-to-server communication, which does not require manual user consent.

### 2.1. Authentication & Setup (OAuth 2.0 with Service Account)

1.  Navigate to the Google Cloud Console.
2.  Enable the **Google Calendar API** for your project.
3.  Go to "Credentials," create a "Service Account," and grant it a suitable role (e.g., "Editor" is not needed, just the ability to interact with calendars).
4.  Create a JSON key for this service account and download it.
5.  Open the advocate's Google Calendar settings, go to "Share with specific people," and add the service account's email address (e.g., `service-account@project-id.iam.gserviceaccount.com`).
6.  Assign it the permission: **"Make changes to events"**.

### 2.2. Environment Variables

Due to Vercel's limitations with multi-line environment variables, the private key needs to be base64 encoded.

```
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account-email@...
GOOGLE_PRIVATE_KEY=...base64_encoded_private_key...
GOOGLE_CALENDAR_ID=advocate_primary_calendar_id@group.calendar.google.com
```

### 2.3. Data Flow

#### 2.3.1. Fetching Availability

The backend provides an endpoint that the frontend can query to get available slots, adjusted for the client's timezone.

1.  **Request:** Frontend calls `GET /api/availability?timezone=America/New_York&date=2023-11-15`.
2.  **Process:** The backend uses the `googleapis` library to query the `freebusy` endpoint of the Calendar API for the advocate's primary calendar.
3.  **Response:** The backend calculates the available 30-minute slots based on the "busy" intervals returned by Google and returns an array of available start times in the requested timezone.

#### 2.3.2. Creating Events

This process is triggered after successful payment verification.

```javascript
// lib/google-calendar.js
import { google } from 'googleapis';

const SCOPES = ['https://www.googleapis.com/auth/calendar'];

function getJwtClient() {
  const privateKey = Buffer.from(process.env.GOOGLE_PRIVATE_KEY, 'base64').toString('ascii');
  return new google.auth.JWT(
    process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    null,
    privateKey,
    SCOPES
  );
}

export async function createCalendarEvent(bookingDetails) {
  const { startTime, endTime, clientEmail, clientName, bookingId } = bookingDetails;
  const jwtClient = getJwtClient();
  const calendar = google.calendar({ version: 'v3', auth: jwtClient });

  const event = {
    summary: `Consultation: ${clientName}`,
    description: `Legal consultation booked via the website.
      \nClient: ${clientName}
      \nEmail: ${clientEmail}
      \nService: 30-minute Audio Call
      \nBooking ID: ${bookingId}
      \n\nA WhatsApp audio call will be initiated at the scheduled time.`,
    start: {
      dateTime: startTime, // ISO 8601 format, e.g., '2023-11-15T10:00:00-05:00'
      timeZone: 'Asia/Kolkata', // Event is created in the advocate's timezone
    },
    end: {
      dateTime: endTime,
      timeZone: 'Asia/Kolkata',
    },
    attendees: [
      { email: process.env.ADVOCATE_EMAIL }, // Advocate's email
      { email: clientEmail },
    ],
    reminders: {
      useDefault: false,
      overrides: [
        { method: 'email', minutes: 24 * 60 },
        { method: 'popup', minutes: 30 },
      ],
    },
  };

  try {
    const res = await calendar.events.insert({
      calendarId: process.env.GOOGLE_CALENDAR_ID,
      resource: event,
    });
    console.log('Calendar event created:', res.data.htmlLink);
    return res.data;
  } catch (error) {
    console.error('Failed to create calendar event:', error);
    // Implement admin notification for manual intervention
    throw new Error('Could not schedule the calendar event.');
  }
}
```

### 2.4. Error Handling (Google Calendar)

*   **Authentication Failure:** The `getJwtClient` or API call will fail. This indicates an issue with the service account credentials. Log the error immediately.
*   **API Rate Limits:** Implement exponential backoff for retries if rate limit errors are encountered.
*   **Event Creation Failure:** If `calendar.events.insert` fails, the booking is already confirmed and paid for. **Do not fail the entire process.** Log the error in detail and trigger an alert (e.g., via email) to the system administrator or advocate to manually create the event.

---

## 3. WhatsApp Integration (via Twilio)

Automated booking confirmations will be sent via WhatsApp to provide clients with immediate assurance. We will use the Twilio API for WhatsApp for its reliability and developer-friendly tools.

### 3.1. Setup & Authentication

1.  Create a Twilio account.
2.  From the Twilio console, obtain your `Account SID` and `Auth Token`.
3.  Connect your WhatsApp Business Profile or use the Twilio Sandbox for development.
4.  Obtain a Twilio phone number enabled for WhatsApp.
5.  **Submit Message Templates for Approval:** The WhatsApp Business API requires pre-approved templates for notifications.

    **Template Name:** `booking_confirmation`
    **Body:** `Hi {{1}}. Your consultation with Kalanidhi Sanjeeva Kumar is confirmed for {{2}} at {{3}} (Your Local Time). Please be ready for an audio call at the scheduled time. Your Booking ID is: {{4}}.`

### 3.2. Environment Variables

```
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886 // Twilio's sandbox or your own number
ADVOCATE_WHATSAPP_NUMBER=whatsapp:+919440217782
```

### 3.3. Data Flow & Implementation

This function is called after successful payment and calendar event creation.

```javascript
// lib/twilio.js
import twilio from 'twilio';

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

export async function sendWhatsAppConfirmation(bookingDetails) {
  const { clientPhone, clientName, formattedDateTime, localTime, bookingId } = bookingDetails;

  // Ensure phone number is in E.164 format
  const to = `whatsapp:${clientPhone}`;

  try {
    const message = await client.messages.create({
      from: process.env.TWILIO_WHATSAPP_NUMBER,
      to: to,
      body: `Hi ${clientName}. Your consultation with Kalanidhi Sanjeeva Kumar is confirmed for ${formattedDateTime} at ${localTime} (Your Local Time). Please be ready for an audio call at the scheduled time. Your Booking ID is: ${bookingId}.`
      // For approved templates, use the `contentSid` and `contentVariables` properties instead of `body`.
    });
    console.log(`WhatsApp confirmation sent to ${clientPhone}. SID: ${message.sid}`);
    return message;
  } catch (error) {
    console.error(`Failed to send WhatsApp message to ${clientPhone}:`, error);
    // Graceful failure: The booking is still valid. Log for follow-up.
    throw new Error('Could not send WhatsApp confirmation.');
  }
}
```

### 3.4. Error Handling (WhatsApp)

*   **Invalid Phone Number:** The Twilio API will return an error (e.g., 21211). Catch this error and log it. The client will not receive a notification, but the booking remains valid.
*   **Client Opt-Out:** If a client has blocked the business number, the message will fail. This should be logged.
*   **API/Authentication Errors:** Indicates an issue with Twilio credentials. Log and alert the admin.
*   **Fallback:** Since WhatsApp is a "best-effort" notification, its failure should not impact the booking's validity. A confirmation email should be considered a mandatory fallback.

```