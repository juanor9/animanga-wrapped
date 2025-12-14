import createMiddleware from 'next-intl/middleware';
import { defaultLocale, locales } from '../i18n';

export default createMiddleware({
  // A list of all locales that are supported
  locales,

  // Used when no locale matches
  defaultLocale,

  // Always use locale prefix
  localePrefix: 'always',
});

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(es|en)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)'],
};
