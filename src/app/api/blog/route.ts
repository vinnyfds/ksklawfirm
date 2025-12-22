import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

/**
 * Helper function to generate excerpt from content
 */
function generateExcerpt(content: string, maxLength: number = 200): string {
  if (!content) return '';
  // Remove HTML tags if present
  const text = content.replace(/<[^>]*>/g, '').trim();
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
}

/**
 * Helper function to calculate reading time
 */
function calculateReadingTime(content: string): string {
  if (!content) return '1 min read';
  // Remove HTML tags and count words
  const text = content.replace(/<[^>]*>/g, '').trim();
  const wordCount = text.split(/\s+/).filter((word) => word.length > 0).length;
  const minutes = Math.ceil(wordCount / 200); // Average 200 words per minute
  return `${minutes} min read`;
}

/**
 * Helper function to extract category from title or content
 */
function extractCategory(title: string, content: string): string {
  const titleLower = title.toLowerCase();
  const contentLower = content.toLowerCase();

  if (titleLower.includes('property') || contentLower.includes('property')) {
    return 'Property Law';
  }
  if (titleLower.includes('divorce') || titleLower.includes('family') || contentLower.includes('divorce') || contentLower.includes('family law')) {
    return 'Family Law';
  }
  if (titleLower.includes('criminal') || contentLower.includes('criminal')) {
    return 'Criminal Law';
  }
  if (titleLower.includes('civil') || contentLower.includes('civil')) {
    return 'Civil Law';
  }
  return 'Legal';
}

/**
 * GET /api/blog
 * Fetches all blog posts, optionally filtered by category
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    const [posts, total] = await Promise.all([
      prisma.content.findMany({
        where: {
          type: 'BLOG_POST',
          isPublished: true,
        },
        orderBy: {
          publishedAt: 'desc',
        },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.content.count({
        where: {
          type: 'BLOG_POST',
          isPublished: true,
        },
      }),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        posts: posts.map((post) => ({
          id: post.id,
          slug: post.slug,
          title: post.title,
          excerpt: generateExcerpt(post.content),
          category: extractCategory(post.title, post.content),
          publishedAt: post.publishedAt?.toISOString() || post.createdAt.toISOString(),
          readingTime: calculateReadingTime(post.content),
        })),
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      },
    });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch blog posts',
      },
      { status: 500 }
    );
  }
}

