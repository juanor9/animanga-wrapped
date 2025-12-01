# Architecture Documentation

## Internationalization (i18n)

The project uses `next-intl` for internationalization. This setup is critical and has specific version requirements.

### Configuration (DO NOT TOUCH)

**Version Requirement**: `next-intl@3.26.0`
**Reason**: Version 4.x has compatibility issues with Next.js 14.2.33 in this specific setup, causing 500 errors and "config not found" issues.

#### 1. File Structure
- `i18n.js` **MUST** be in the project root (not in `src/`).
- `messages/` **MUST** be in the project root.
- `next.config.js` **MUST** use relative path `./i18n.js`.

#### 2. Middleware (`src/middleware.js`)
The middleware handles locale redirection and detection.

**Critical Implementation Detail**:
Due to CommonJS/ESM interop issues with `next-intl` v3, the middleware export **MUST** access the default property explicitly:

```javascript
import createMiddleware from 'next-intl/middleware';
import { defaultLocale, locales } from '../i18n';

// NOTE: .default is required here due to CJS/ESM interop
export default createMiddleware.default({
  locales,
  defaultLocale,
  localePrefix: 'always',
});
```

#### 3. Request Configuration (`i18n.js`)
Located at project root.

```javascript
import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale)) notFound();

  return {
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
```

#### 4. Layout Integration (`src/app/[locale]/layout.jsx`)
- **MUST** use `NextIntlClientProvider`.
- **MUST** use `getMessages` from `next-intl/server`.
- **DO NOT** use `unstable_setRequestLocale` (causes crashes in this version combination).

### Routing
- **Pattern**: `src/app/[locale]/`
- **Root Layout**: There is **NO** `src/app/layout.jsx`. The root layout is `src/app/[locale]/layout.jsx`.
- **Root Page**: There is **NO** `src/app/page.jsx`. The middleware handles the redirect from `/` to `/[locale]`.

## State Management (Redux)
- Uses Redux Toolkit.
- Wrapped in `NextIntlClientProvider` to ensure translations are available to Redux components if needed.

## Styling
- SCSS with BEM naming convention.
- Global styles imported in `src/app/[locale]/layout.jsx` **BEFORE** other imports to ensure correct cascade.
