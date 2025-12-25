import createMiddleware from 'next-intl/middleware';
import { routing } from './src/i18n';

export default createMiddleware(routing);

// This middleware ensures that:
// 1. Locale is always detected from the URL pathname
// 2. Locale preference is preserved in cookies for subsequent requests
// 3. All navigation maintains the selected locale

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: [
    // Match all pathnames except for
    // - … if they start with `/api`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
};
