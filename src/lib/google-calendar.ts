/**
 * Google Calendar integration utilities
 * Handles fetching availability and creating calendar events
 */

import { google } from 'googleapis';

const SCOPES = ['https://www.googleapis.com/auth/calendar'];

/**
 * Get authenticated JWT client for Google Calendar API
 */
function getJwtClient() {
  if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
    throw new Error('Google Calendar credentials are not configured');
  }

  const privateKey = Buffer.from(process.env.GOOGLE_PRIVATE_KEY, 'base64').toString('ascii');
  
  return new google.auth.JWT(
    process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    undefined,
    privateKey,
    SCOPES
  );
}

/**
 * Working hours configuration (IST - Asia/Kolkata)
 */
const WORKING_HOURS = {
  start: 10, // 10 AM IST
  end: 18, // 6 PM IST
};

const SLOT_DURATION_MINUTES = 30;
const SLOT_BUFFER_MINUTES = 15; // Buffer between slots

/**
 * Generate all possible time slots for a given date range
 * @param startDate - Start date
 * @param endDate - End date
 * @param busyPeriods - Array of busy periods from Google Calendar
 * @returns Array of available time slots in UTC
 */
function generateAvailableSlots(
  startDate: Date,
  endDate: Date,
  busyPeriods: Array<{ start: string; end: string }>
): Array<{ startTime: string; endTime: string }> {
  const availableSlots: Array<{ startTime: string; endTime: string }> = [];
  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    // Skip weekends (Saturday = 6, Sunday = 0)
    const dayOfWeek = currentDate.getUTCDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      currentDate.setUTCDate(currentDate.getUTCDate() + 1);
      continue;
    }

    // Generate slots for this day in IST, then convert to UTC
    const istDate = new Date(
      Date.UTC(
        currentDate.getUTCFullYear(),
        currentDate.getUTCMonth(),
        currentDate.getUTCDate(),
        WORKING_HOURS.start,
        0,
        0
      )
    );

    // Convert IST to UTC (IST is UTC+5:30)
    const istOffset = 5.5 * 60 * 60 * 1000; // 5.5 hours in milliseconds
    const utcStart = new Date(istDate.getTime() - istOffset);

    const endOfDay = new Date(utcStart);
    endOfDay.setUTCHours(WORKING_HOURS.end - 5, 30, 0, 0); // Convert 6 PM IST to UTC

    let currentSlot = new Date(utcStart);

    while (currentSlot < endOfDay) {
      const slotEnd = new Date(currentSlot.getTime() + SLOT_DURATION_MINUTES * 60 * 1000);

      // Check if this slot overlaps with any busy period
      const isBusy = busyPeriods.some((busy) => {
        const busyStart = new Date(busy.start);
        const busyEnd = new Date(busy.end);
        return (
          (currentSlot >= busyStart && currentSlot < busyEnd) ||
          (slotEnd > busyStart && slotEnd <= busyEnd) ||
          (currentSlot <= busyStart && slotEnd >= busyEnd)
        );
      });

      if (!isBusy) {
        availableSlots.push({
          startTime: currentSlot.toISOString(),
          endTime: slotEnd.toISOString(),
        });
      }

      // Move to next slot (add duration + buffer)
      currentSlot = new Date(
        currentSlot.getTime() + (SLOT_DURATION_MINUTES + SLOT_BUFFER_MINUTES) * 60 * 1000
      );
    }

    // Move to next day
    currentDate.setUTCDate(currentDate.getUTCDate() + 1);
  }

  return availableSlots;
}

/**
 * Generate mock availability slots for testing
 * Creates slots for weekdays (Mon-Fri) from 10 AM to 6 PM IST
 */
function generateMockAvailability(
  startDate: Date,
  endDate: Date
): Array<{ startTime: string; endTime: string }> {
  const slots: Array<{ startTime: string; endTime: string }> = [];
  const currentDate = new Date(startDate);
  const SLOT_DURATION_MINUTES = 30;
  const SLOT_BUFFER_MINUTES = 15;

  while (currentDate <= endDate) {
    // Skip weekends (Saturday = 6, Sunday = 0)
    const dayOfWeek = currentDate.getUTCDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      currentDate.setUTCDate(currentDate.getUTCDate() + 1);
      continue;
    }

    // Generate slots for this day in IST (10 AM - 6 PM), then convert to UTC
    const year = currentDate.getUTCFullYear();
    const month = currentDate.getUTCMonth();
    const day = currentDate.getUTCDate();

    // IST is UTC+5:30, so 10 AM IST = 4:30 AM UTC
    const istStartHour = 10;
    const istEndHour = 18;
    const istOffset = 5.5 * 60 * 60 * 1000; // 5.5 hours in milliseconds

    // Create start time in IST, then convert to UTC
    const istDate = new Date(Date.UTC(year, month, day, istStartHour, 0, 0));
    const utcStart = new Date(istDate.getTime() - istOffset);

    // Create end time in IST, then convert to UTC
    const istEndDate = new Date(Date.UTC(year, month, day, istEndHour, 0, 0));
    const utcEnd = new Date(istEndDate.getTime() - istOffset);

    let currentSlot = new Date(utcStart);

    while (currentSlot < utcEnd) {
      const slotEnd = new Date(currentSlot.getTime() + SLOT_DURATION_MINUTES * 60 * 1000);

      if (slotEnd <= utcEnd) {
        slots.push({
          startTime: currentSlot.toISOString(),
          endTime: slotEnd.toISOString(),
        });
      }

      // Move to next slot (add duration + buffer)
      currentSlot = new Date(
        currentSlot.getTime() + (SLOT_DURATION_MINUTES + SLOT_BUFFER_MINUTES) * 60 * 1000
      );
    }

    // Move to next day
    currentDate.setUTCDate(currentDate.getUTCDate() + 1);
  }

  return slots;
}

/**
 * Fetch available time slots from Google Calendar
 * @param startDate - Start date for availability check
 * @param endDate - End date for availability check
 * @returns Array of available time slots in UTC
 */
export async function getAvailableSlots(
  startDate: Date,
  endDate: Date
): Promise<Array<{ startTime: string; endTime: string }>> {
  if (!process.env.GOOGLE_CALENDAR_ID) {
    // Return mock data for development/testing
    console.warn('Google Calendar ID not configured. Returning mock availability for testing.');
    return generateMockAvailability(startDate, endDate);
  }

  const jwtClient = getJwtClient();
  const calendar = google.calendar({ version: 'v3', auth: jwtClient });

  try {
    const response = await calendar.freebusy.query({
      requestBody: {
        timeMin: startDate.toISOString(),
        timeMax: endDate.toISOString(),
        items: [{ id: process.env.GOOGLE_CALENDAR_ID }],
      },
    });

    // Extract busy periods from the response
    const busyPeriods: Array<{ start: string; end: string }> = [];
    const calendars = response.data.calendars;

    if (calendars && process.env.GOOGLE_CALENDAR_ID) {
      const calendarData = calendars[process.env.GOOGLE_CALENDAR_ID];
      if (calendarData?.busy) {
        // Filter and map to ensure start and end are strings
        const validBusyPeriods = calendarData.busy
          .filter((period) => period.start && period.end)
          .map((period) => ({
            start: period.start!,
            end: period.end!,
          }));
        busyPeriods.push(...validBusyPeriods);
      }
    }

    // Generate available slots based on working hours and busy periods
    const availableSlots = generateAvailableSlots(startDate, endDate, busyPeriods);

    return availableSlots;
  } catch (error) {
    console.error('Failed to fetch calendar availability:', error);
    // Return mock data on error for graceful degradation
    return generateMockAvailability(startDate, endDate);
  }
}

/**
 * Create a calendar event for a booking
 * @param bookingDetails - Details of the booking to create
 * @returns Created calendar event
 */
export async function createCalendarEvent(bookingDetails: {
  startTime: string;
  endTime: string;
  clientEmail: string;
  clientName: string;
  bookingId: string;
}) {
  const jwtClient = getJwtClient();
  const calendar = google.calendar({ version: 'v3', auth: jwtClient });

  const event = {
    summary: `Consultation: ${bookingDetails.clientName}`,
    description: `Legal consultation booked via the website.
      \nClient: ${bookingDetails.clientName}
      \nEmail: ${bookingDetails.clientEmail}
      \nService: Consultation
      \nBooking ID: ${bookingDetails.bookingId}
      \n\nA WhatsApp audio call will be initiated at the scheduled time.`,
    start: {
      dateTime: bookingDetails.startTime,
      timeZone: 'Asia/Kolkata',
    },
    end: {
      dateTime: bookingDetails.endTime,
      timeZone: 'Asia/Kolkata',
    },
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
      calendarId: process.env.GOOGLE_CALENDAR_ID!,
      requestBody: event,
    });
    return res.data;
  } catch (error) {
    console.error('Failed to create calendar event:', error);
    throw new Error('Could not schedule the calendar event');
  }
}

