/**
 * Email service utilities
 * Handles sending transactional emails via Resend
 */

import { Resend } from 'resend';
import { formatInTimezone, formatDualTimezone } from './utils';
import { format } from 'date-fns';

// Lazy initialization to avoid build-time errors
function getResendClient() {
  if (!process.env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY is not configured');
  }
  return new Resend(process.env.RESEND_API_KEY);
}

/**
 * Generate .ics calendar file content
 */
function generateICSFile(
  startTime: Date,
  endTime: Date,
  summary: string,
  description: string,
  location: string = 'WhatsApp Audio Call'
): string {
  const formatICSDate = (date: Date): string => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Kalanidhi Sanjeeva Kumar//Consultation Booking//EN
BEGIN:VEVENT
UID:${startTime.getTime()}@advocate-kalanidhi.com
DTSTAMP:${formatICSDate(new Date())}
DTSTART:${formatICSDate(startTime)}
DTEND:${formatICSDate(endTime)}
SUMMARY:${summary}
DESCRIPTION:${description}
LOCATION:${location}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;
}

/**
 * Send booking confirmation email
 * @param bookingDetails - Details of the confirmed booking
 */
export async function sendBookingConfirmation(bookingDetails: {
  clientEmail: string;
  clientName: string;
  appointmentDate: string;
  appointmentTime: string;
  timezone: string;
  bookingId: string;
  documentUploadLink: string;
  startTime?: string;
  endTime?: string;
}) {
  try {
    const startTime = bookingDetails.startTime
      ? new Date(bookingDetails.startTime)
      : new Date();
    const endTime = bookingDetails.endTime
      ? new Date(bookingDetails.endTime)
      : new Date(startTime.getTime() + 30 * 60 * 1000); // Default 30 minutes

    const dualTime = bookingDetails.startTime
      ? formatDualTimezone(bookingDetails.startTime, bookingDetails.timezone)
      : null;

    const icsContent = generateICSFile(
      startTime,
      endTime,
      'Legal Consultation with Kalanidhi Sanjeeva Kumar',
      `Consultation booking ID: ${bookingDetails.bookingId}\n\nMr. Kumar will contact you via WhatsApp audio call at the scheduled time.`,
      'WhatsApp Audio Call'
    );

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #1B4F72; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; background-color: #f9f9f9; }
            .details { background-color: white; padding: 15px; margin: 15px 0; border-left: 4px solid #F39C12; }
            .button { display: inline-block; padding: 12px 24px; background-color: #F39C12; color: white; text-decoration: none; border-radius: 4px; margin: 10px 0; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Consultation Confirmed</h1>
            </div>
            <div class="content">
              <p>Dear ${bookingDetails.clientName},</p>
              <p>Your consultation with <strong>Kalanidhi Sanjeeva Kumar</strong> has been confirmed.</p>
              
              <div class="details">
                <h3>Appointment Details</h3>
                <p><strong>Date:</strong> ${bookingDetails.appointmentDate}</p>
                <p><strong>Time:</strong> ${bookingDetails.appointmentTime} (${bookingDetails.timezone})</p>
                ${dualTime ? `<p><strong>IST:</strong> ${dualTime.istTime}</p>` : ''}
                <p><strong>Booking ID:</strong> ${bookingDetails.bookingId}</p>
              </div>

              <div class="details">
                <h3>Important Information</h3>
                <p><strong>WhatsApp Contact:</strong> Mr. Kumar will contact you via WhatsApp audio call at the scheduled time on the phone number you provided.</p>
                <p><strong>Phone Number:</strong> <a href="tel:+919440217782">+91 9440217782</a></p>
              </div>

              <div class="details">
                <h3>Document Upload</h3>
                <p>You can securely upload any relevant documents using the link below:</p>
                <a href="${bookingDetails.documentUploadLink}" class="button">Upload Documents</a>
              </div>

              <div class="details">
                <h3>Cancellation Policy</h3>
                <p>If you need to cancel or reschedule your appointment, please contact us at least 24 hours in advance.</p>
              </div>
            </div>
            <div class="footer">
              <p>Kalanidhi Sanjeeva Kumar - High Court Advocate</p>
              <p>Hyderabad, Telangana, India</p>
              <p>Phone: <a href="tel:+919440217782">+91 9440217782</a></p>
            </div>
          </div>
        </body>
      </html>
    `;

    const resend = getResendClient();
    await resend.emails.send({
      from: process.env.ADVOCATE_EMAIL || 'noreply@example.com',
      to: bookingDetails.clientEmail,
      subject: 'Consultation Confirmed - Kalanidhi Sanjeeva Kumar',
      html: emailHtml,
      attachments: [
        {
          filename: 'consultation.ics',
          content: Buffer.from(icsContent).toString('base64'),
        },
      ],
    });
  } catch (error) {
    console.error('Failed to send confirmation email:', error);
    throw new Error('Could not send confirmation email');
  }
}

