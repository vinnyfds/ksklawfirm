import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

/**
 * GET /api/consultations
 * Fetches the list of available consultation types
 */
export async function GET() {
  try {
    const consultations = await prisma.consultationType.findMany({
      orderBy: {
        price: 'asc',
      },
    });

    const formattedConsultations = consultations.map((consultation) => ({
      id: consultation.id,
      name: consultation.name,
      description: consultation.description,
      durationMinutes: consultation.durationMinutes,
      price: {
        amount: Number(consultation.price),
        currency: consultation.currency,
      },
    }));

    return NextResponse.json({
      success: true,
      data: {
        consultations: formattedConsultations,
      },
    });
  } catch (error) {
    console.error('Error fetching consultations:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch consultations',
      },
      { status: 500 }
    );
  }
}

