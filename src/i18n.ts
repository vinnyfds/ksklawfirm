import { getRequestConfig } from 'next-intl/server';
import { defineRouting } from 'next-intl/routing';

export const locales = ['en', 'hi', 'te', 'ta'] as const;
export type Locale = (typeof locales)[number];

export const routing = defineRouting({
  locales,
  defaultLocale: 'en',
  localePrefix: 'always',
});

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  // If requestLocale is not provided, use default locale
  // The locale will be correctly set from the [locale] route param in the layout
  if (!locale || !routing.locales.includes(locale as Locale)) {
    locale = routing.defaultLocale;
  }

  let messages;
  try {
    messages = (await import(`./messages/${locale}.json`)).default;
  } catch (error) {
    throw error;
  }

  return {
    locale,
    messages,
  };
});
