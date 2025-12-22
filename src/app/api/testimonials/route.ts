import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

/**
 * GET /api/testimonials
 * Fetches all testimonials
 */
export async function GET(request: NextRequest) {
  try {
    const testimonials = await prisma.content.findMany({
      where: {
        type: 'TESTIMONIAL',
        isPublished: true,
      },
      orderBy: {
        publishedAt: 'desc',
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        testimonials: testimonials.map((t) => {
          // Extract client name from title (format: "Client Name" or use title as-is)
          const clientName = t.title || 'Anonymous';
          // Use clientLocation field for location
          const location = t.clientLocation || '';
          // Use content as the quote
          const quote = t.content || '';

          // Generate image URL from authorName field (stored as img_1, img_2, etc.)
          let imageUrl: string | undefined;
          if (t.authorName && t.authorName.startsWith('img_')) {
            const imageIndex = parseInt(t.authorName.replace('img_', ''), 10);
            if (!isNaN(imageIndex)) {
              imageUrl = `https://i.pravatar.cc/150?img=${imageIndex}`;
            }
          }

          // Fallback: generate based on client name if no image index
          if (!imageUrl) {
            imageUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
              clientName
            )}&size=150&background=1B4F72&color=fff`;
          }

          return {
            id: t.id,
            quote,
            clientName,
            location,
            rating: 5, // Default rating for all testimonials
            imageUrl,
          };
        }),
      },
    });
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch testimonials',
      },
      { status: 500 }
    );
  }
}

