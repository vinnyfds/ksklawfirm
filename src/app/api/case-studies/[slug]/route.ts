import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

type RouteParams = {
  params: {
    slug: string;
  };
};

/**
 * Helper function to extract outcome from content
 */
function extractOutcome(content: string): string {
  if (!content) return '';
  const text = content.replace(/<[^>]*>/g, '');
  const outcomeMatch = text.match(/(?:outcome|result|conclusion)[:\-]?\s*(.+?)(?:\.|$)/i);
  if (outcomeMatch && outcomeMatch[1]) {
    return outcomeMatch[1].trim();
  }
  return '';
}

/**
 * GET /api/case-studies/[slug]
 * Fetches a single case study by slug
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const caseStudy = await prisma.content.findFirst({
      where: {
        slug: params.slug,
        type: 'CASE_STUDY',
        isPublished: true,
      },
    });

    if (!caseStudy) {
      return NextResponse.json(
        {
          success: false,
          error: 'Case study not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        caseStudy: {
          id: caseStudy.id,
          slug: caseStudy.slug,
          title: caseStudy.title,
          content: caseStudy.content,
          excerpt: caseStudy.content.substring(0, 200).replace(/<[^>]*>/g, '').trim() + '...',
          category: 'Legal', // Default category since not in schema
          outcome: extractOutcome(caseStudy.content) || 'Case successfully resolved',
          publishedAt: caseStudy.publishedAt?.toISOString() || caseStudy.createdAt.toISOString(),
        },
      },
    });
  } catch (error) {
    console.error('Error fetching case study:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch case study',
      },
      { status: 500 }
    );
  }
}

