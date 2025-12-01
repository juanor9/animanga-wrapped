# i18n Configuration Guide

> **CRITICAL WARNING**: This configuration is extremely sensitive to version mismatches and file locations. **DO NOT MODIFY** without understanding the constraints documented below.

## 1. Core Dependencies

- **Next.js**: `14.2.33` (App Router)
- **next-intl**: `3.26.0` (Strict requirement)
  - *Note*: Version 4.x is currently incompatible with this specific Next.js setup, causing persistent 500 errors.

## 2. File Structure

The location of configuration files is **mandatory**:

```text
/ (Root)
├── i18n.js                  <-- MUST be in root
├── messages/                <-- MUST be in root
│   ├── en.json
│   └── es.json
├── next.config.js           <-- MUST be in root
└── src/
    ├── middleware.js        <-- Next.js middleware
    └── app/
        └── [locale]/        <-- Dynamic route segment
            └── layout.jsx   <-- Locale layout
```

## 3. Configuration Files

### A. `next.config.js`
Must use a relative path to `i18n.js`. Absolute paths or `path.resolve` can cause issues with the plugin's file resolution in some environments.

```javascript
import createNextIntlPlugin from 'next-intl/plugin';

// Usage of relative path is critical
const withNextIntl = createNextIntlPlugin('./i18n.js');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // ... other config
};

export default withNextIntl(nextConfig);
```

### B. `i18n.js`
Defines how messages are loaded. Must handle the import asynchronously.

```javascript
import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

export const locales = ['en', 'es'];
export const defaultLocale = 'en';

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale)) notFound();

  return {
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
```

### C. `src/middleware.js`
**CRITICAL FIX**: Due to a CommonJS/ESM interop issue in `next-intl` v3, we must access the `.default` property of `createMiddleware`.

```javascript
import createMiddleware from 'next-intl/middleware';
import { defaultLocale, locales } from '../i18n';

// NOTE: .default is REQUIRED here.
// Failure to use .default results in "createMiddleware is not a function" error.
export default createMiddleware.default({
  locales,
  defaultLocale,
  localePrefix: 'always',
});

export const config = {
  matcher: ['/', '/(es|en)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)'],
};
```

### D. `src/app/[locale]/layout.jsx`
Handles the client provider and global styles.

1. **Style Import Order**: `global.scss` MUST be imported **first** to ensure it overrides browser defaults and isn't overwritten by component styles.
2. **Provider**: `NextIntlClientProvider` wraps the application.
3. **Static Params**: `generateStaticParams` is required for static export/generation.

```javascript
import '../global.scss'; // <--- MUST BE FIRST
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
// ... other imports

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'es' }];
}

export default async function LocaleLayout({ children, params: { locale } }) {
  // Validate locale
  if (!['en', 'es'].includes(locale)) notFound();

  // Load messages
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {/* App Content */}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

## 4. Troubleshooting

### "Couldn't find next-intl config file" (500 Error)
- **Cause**: `i18n.js` is in the wrong place or `next.config.js` has a bad path.
- **Fix**: Ensure `i18n.js` is in root and `next.config.js` uses `./i18n.js`.
- **Action**: Restart server (`rm -rf .next && npm run dev`).

### "createMiddleware is not a function"
- **Cause**: `next-intl` v3 ESM import issue.
- **Fix**: Change `createMiddleware({...})` to `createMiddleware.default({...})` in `src/middleware.js`.

### Styles not applying / Broken layout
- **Cause**: CSS import order.
- **Fix**: Move `import '../global.scss'` to the very top of `src/app/[locale]/layout.jsx`.

### "unstable_setRequestLocale is not a function"
- **Cause**: Using v4 API methods in v3.
- **Fix**: Remove `unstable_setRequestLocale` calls. They are not needed for standard runtime translation in v3.
