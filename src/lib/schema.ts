/**
 * Schema.org JSON-LD utility functions for structured data
 */

export interface LegalServiceSchema {
  name: string;
  description: string;
  serviceType: string;
  areaServed: string[];
  provider: {
    name: string;
    url: string;
    logo?: string;
  };
}

export interface OrganizationSchema {
  name: string;
  url: string;
  logo?: string;
  description?: string;
  contactPoint?: {
    telephone: string;
    contactType: string;
    areaServed: string[];
    availableLanguage: string[];
  };
  address?: {
    addressLocality: string;
    addressRegion: string;
    addressCountry: string;
  };
}

/**
 * Generates JSON-LD script for LegalService schema
 */
export function generateLegalServiceSchema(config: LegalServiceSchema): string {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: config.name,
    description: config.description,
    serviceType: config.serviceType,
    areaServed: config.areaServed.map((area) => ({
      '@type': 'Country',
      name: area,
    })),
    provider: {
      '@type': 'Organization',
      name: config.provider.name,
      url: config.provider.url,
      ...(config.provider.logo && { logo: config.provider.logo }),
    },
  };

  return JSON.stringify(schema, null, 2);
}

/**
 * Generates JSON-LD script for Organization schema
 */
export function generateOrganizationSchema(config: OrganizationSchema): string {
  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: config.name,
    url: config.url,
    ...(config.logo && { logo: config.logo }),
    ...(config.description && { description: config.description }),
    ...(config.address && {
      address: {
        '@type': 'PostalAddress',
        addressLocality: config.address.addressLocality,
        addressRegion: config.address.addressRegion,
        addressCountry: config.address.addressCountry,
      },
    }),
    ...(config.contactPoint && {
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: config.contactPoint.telephone,
        contactType: config.contactPoint.contactType,
        areaServed: config.contactPoint.areaServed.map((area) => ({
          '@type': 'Country',
          name: area,
        })),
        availableLanguage: config.contactPoint.availableLanguage,
      },
    }),
  };

  return JSON.stringify(schema, null, 2);
}

/**
 * Generates JSON-LD script for Person schema (for the advocate)
 */
export function generatePersonSchema(config: {
  name: string;
  jobTitle: string;
  description?: string;
  telephone?: string;
  email?: string;
  address?: {
    addressLocality: string;
    addressRegion: string;
    addressCountry: string;
  };
}): string {
  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: config.name,
    jobTitle: config.jobTitle,
    ...(config.description && { description: config.description }),
    ...(config.telephone && { telephone: config.telephone }),
    ...(config.email && { email: config.email }),
    ...(config.address && {
      address: {
        '@type': 'PostalAddress',
        addressLocality: config.address.addressLocality,
        addressRegion: config.address.addressRegion,
        addressCountry: config.address.addressCountry,
      },
    }),
  };

  return JSON.stringify(schema, null, 2);
}

