# Agents Instructions

## Project Overview

This is a Next.js 14 application (App Router) that provides anime/manga statistics wrapped for users connected to AniList.

## Development Commands

```bash
npm run dev            # Start development server
npm run build          # Build for production
npm run lint           # Run ESLint
npm run lint:fix       # Fix ESLint issues
npm run lint:styles    # Run Stylelint for CSS/SCSS
npm run lint:styles:fix # Fix Stylelint issues
npm run format         # Format code with Prettier
npm run format:check   # Check formatting without changes
npm run type-check     # Run TypeScript checks
npm run a11y           # Run accessibility audit
npm run lint:all       # Run all linters
```

## Linting & Formatting

### ESLint
Checks JavaScript/JSX code quality:
```bash
npm run lint        # Check for issues
npm run lint:fix    # Auto-fix issues
```

### Prettier
Formats code consistently:
```bash
npm run format        # Format all files
npm run format:check  # Check without modifying
```

### Stylelint
Lints CSS/SCSS files:
```bash
npm run lint:styles       # Check for issues
npm run lint:styles:fix   # Auto-fix issues
```

### Run All Linters
```bash
npm run lint:all
```

## Accessibility Testing

### Automated Audit Script

Run accessibility audits using axe-core:

```bash
# Audit default page (localhost:3000)
npm run a11y

# Audit specific page
BASE_URL=http://localhost:3000/register npm run a11y
BASE_URL=http://localhost:3000/privacy-policy npm run a11y
```

The audit checks for WCAG 2.0/2.1 AA compliance including:
- Color contrast
- Heading order
- Image alt text
- Form labels
- Link names
- Button names
- Landmark regions

### Development-time Checking

The `AxeDevTool` component in `src/app/components/AxeDevTool/` automatically runs axe-core in development mode, logging accessibility violations to the browser console.

## Code Standards

### Accessibility Requirements

1. **Headings**: Follow proper hierarchy (h1 -> h2 -> h3), never skip levels
2. **Landmarks**: Use semantic HTML (`<main>`, `<nav>`, `<header>`, `<footer>`)
3. **Images**: Always include meaningful `alt` text
4. **Forms**: Associate labels with inputs
5. **Links/Buttons**: Ensure discernible text or aria-labels

### File Structure

```
src/
├── app/
│   ├── components/     # Reusable UI components
│   ├── features/       # Feature-based modules
│   ├── lib/           # Utility functions
│   └── [routes]/      # Page routes
├── middleware/        # Next.js middleware
└── redux/            # State management
```

## Testing Notes

- The home page requires external API access (AniList GraphQL)
- Static pages (register, privacy-policy, terms-and-conditions) work offline
- Run `npm install` before first use

## Dependencies

### Linting & Formatting
- `eslint` - JavaScript/JSX linting
- `eslint-plugin-prettier` - Prettier integration for ESLint
- `eslint-plugin-import` - Import/export linting
- `eslint-plugin-jsx-a11y` - Accessibility linting for JSX
- `prettier` - Code formatting
- `stylelint` - CSS/SCSS linting
- `stylelint-config-standard-scss` - SCSS standard config
- `stylelint-order` - CSS property ordering

### Accessibility Testing
- `@axe-core/react` - Development-time a11y checking
- `@axe-core/playwright` - Automated testing
- `axe-core` - Core accessibility engine
- `jsdom` - Server-side DOM for testing
