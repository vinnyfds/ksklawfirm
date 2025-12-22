import { NextRequest, NextResponse } from 'next/server';
import { getAvailableSlots } from '@/lib/google-calendar';

/**
 * GET /api/availability
 * Fetches available time slots
 * Query params: startDate, endDate, timezone
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const startDateParam = searchParams.get('startDate');
    const endDateParam = searchParams.get('endDate');
    const timezone = searchParams.get('timezone') || 'Asia/Kolkata';

    if (!startDateParam || !endDateParam) {
      return NextResponse.json(
        {
          success: false,
          error: 'startDate and endDate are required',
        },
        { status: 400 }
      );
    }

    const startDate = new Date(startDateParam);
    const endDate = new Date(endDateParam);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid date format',
        },
        { status: 400 }
      );
    }

    // Fetch available slots from Google Calendar
    const slots = await getAvailableSlots(startDate, endDate);

    return NextResponse.json({
      success: true,
      data: {
        slots,
        timezone,
      },
    });
  } catch (error) {
    console.error('Error fetching availability:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch availability',
      },
      { status: 500 }
    );
  }
}

