import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

type RouteParams = {
  params: {
    slug: string;
  };
};

/**
 * Helper function to calculate reading time
 */
function calculateReadingTime(content: string): string {
  if (!content) return '1 min read';
  const text = content.replace(/<[^>]*>/g, '').trim();
  const wordCount = text.split(/\s+/).filter((word) => word.length > 0).length;
  const minutes = Math.ceil(wordCount / 200);
  return `${minutes} min read`;
}

/**
 * GET /api/blog/[slug]
 * Fetches a single blog post by slug
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const post = await prisma.content.findFirst({
      where: {
        slug: params.slug,
        type: 'BLOG_POST',
        isPublished: true,
      },
    });

    if (!post) {
      return NextResponse.json(
        {
          success: false,
          error: 'Blog post not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        post: {
          id: post.id,
          slug: post.slug,
          title: post.title,
          content: post.content,
          excerpt: post.content.substring(0, 200).replace(/<[^>]*>/g, '').trim() + '...',
          category: 'Legal', // Default category since not in schema
          publishedAt: post.publishedAt?.toISOString() || post.createdAt.toISOString(),
          readingTime: calculateReadingTime(post.content),
        },
      },
    });
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch blog post',
      },
      { status: 500 }
    );
  }
}

