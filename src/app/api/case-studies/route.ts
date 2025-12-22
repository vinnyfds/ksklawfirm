import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

/**
 * Helper function to generate excerpt from content
 */
function generateExcerpt(content: string, maxLength: number = 200): string {
  if (!content) return '';
  const text = content.replace(/<[^>]*>/g, '').trim();
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
}

/**
 * Helper function to extract outcome from content
 * Looks for "Outcome:" or similar patterns in the content
 */
function extractOutcome(content: string): string {
  if (!content) return '';
  const text = content.replace(/<[^>]*>/g, '');
  // Look for outcome patterns
  const outcomeMatch = text.match(/(?:outcome|result|conclusion)[:\-]?\s*(.+?)(?:\.|$)/i);
  if (outcomeMatch && outcomeMatch[1]) {
    return outcomeMatch[1].trim();
  }
  return '';
}

/**
 * Helper function to extract category from title or content
 */
function extractCategory(title: string, content: string): string {
  const titleLower = title.toLowerCase();
  const contentLower = content.toLowerCase();

  if (titleLower.includes('ancestral') || titleLower.includes('property') || contentLower.includes('ancestral property')) {
    return 'Ancestral Properties';
  }
  if (titleLower.includes('divorce') || contentLower.includes('divorce')) {
    return 'Divorce';
  }
  if (titleLower.includes('property') || contentLower.includes('property litigation')) {
    return 'Property Litigation';
  }
  if (titleLower.includes('criminal') || contentLower.includes('criminal')) {
    return 'Criminal Matters';
  }
  if (titleLower.includes('civil') || contentLower.includes('civil')) {
    return 'Civil Matters';
  }
  return 'Legal';
}

/**
 * GET /api/case-studies
 * Fetches all case studies, optionally filtered by category
 */
export async function GET(request: NextRequest) {
  try {
    const caseStudies = await prisma.content.findMany({
      where: {
        type: 'CASE_STUDY',
        isPublished: true,
      },
      orderBy: {
        publishedAt: 'desc',
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        caseStudies: caseStudies.map((cs) => ({
          id: cs.id,
          slug: cs.slug,
          title: cs.title,
          excerpt: generateExcerpt(cs.content),
          category: extractCategory(cs.title, cs.content),
          outcome: extractOutcome(cs.content) || 'Case successfully resolved',
          publishedAt: cs.publishedAt?.toISOString() || cs.createdAt.toISOString(),
        })),
      },
    });
  } catch (error) {
    console.error('Error fetching case studies:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch case studies',
      },
      { status: 500 }
    );
  }
}

