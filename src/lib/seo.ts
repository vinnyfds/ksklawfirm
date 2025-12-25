import { Metadata } from 'next';

export interface SEOConfig {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'profile';
  noindex?: boolean;
  locale?: string;
}

/**
 * Generates comprehensive SEO metadata for Next.js pages
 * Includes title, description, canonical URL, and Open Graph tags
 */
export function generateSEOMetadata(config: SEOConfig, baseUrl: string = 'https://www.ksklawfirm.com'): Metadata {
  const {
    title,
    description,
    canonical,
    ogImage = `${baseUrl}/images/og-default.jpg`,
    ogType = 'website',
    noindex = false,
    locale = 'en',
  } = config;

  // Ensure title is 50-60 characters for optimal SEO
  const optimizedTitle = title.length > 60 ? title.substring(0, 57) + '...' : title;
  
  // Ensure description is 150-160 characters for optimal SEO
  const optimizedDescription =
    description.length > 160 ? description.substring(0, 157) + '...' : description;

  const canonicalUrl = canonical || baseUrl;
  const ogUrl = canonical || baseUrl;

  return {
    title: optimizedTitle,
    description: optimizedDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: optimizedTitle,
      description: optimizedDescription,
      url: ogUrl,
      siteName: 'KSK Law Firm',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: optimizedTitle,
        },
      ],
      locale,
      type: ogType,
    },
    twitter: {
      card: 'summary_large_image',
      title: optimizedTitle,
      description: optimizedDescription,
      images: [ogImage],
    },
    robots: {
      index: !noindex,
      follow: !noindex,
      googleBot: {
        index: !noindex,
        follow: !noindex,
      },
    },
  };
}

/**
 * Gets the base URL for the current environment
 */
export function getBaseUrl(): string {
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  
  // In production, use the actual domain
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }
  
  // Fallback for development
  return 'https://www.ksklawfirm.com';
}

