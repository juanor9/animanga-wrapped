# Claude Code Instructions

## Important Rules

**NEVER skip linting rules.** Always fix errors properly instead of downgrading rules from "error" to "warn" or disabling them.

**DO NOT MODIFY i18n CONFIGURATION.** The `next-intl` setup (v3.26.0) is fragile due to version compatibility. See `I18N_CONFIG.md` before touching `src/middleware.js`, `i18n.js`, or `next.config.js`.

## Import Order

This project uses ESLint's `import/order` rule with strict alphabetical ordering. When writing or modifying imports, follow this order:

### Import Groups (in order)

1. **builtin** - Node.js built-in modules (`fs`, `path`, etc.)
2. **external** - npm packages (`react`, `next`, `react-redux`, etc.)
3. **internal** - Absolute imports within the project
4. **parent/sibling** - Relative imports (`../`, `./`)
5. **index** - Index files like `./styles.scss`

### Rules

- **Alphabetize within each group** (case-insensitive)
- **No newlines between imports**
- **Named imports should be alphabetized** (`{ useEffect, useState }` not `{ useState, useEffect }`)

### Example

```javascript
'use client';

// External packages (alphabetized)
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

// Parent/sibling imports (alphabetized by path)
import { newUser } from '../../../../../redux/features/user';
import Spinner from '../../../../components/Spinner/Spinner';
import { getData } from '../../../../lib/api';
import ComponentA from '../ComponentA/ComponentA';
import ComponentB from '../ComponentB/ComponentB';

// Index imports (stylesheets)
import './styles.scss';
```

### Common Mistakes to Avoid

1. **Wrong**: Placing `.scss` imports in the middle

   ```javascript
   // BAD
   import './styles.scss';
   import Component from './Component';
   ```

2. **Wrong**: react-redux before react

   ```javascript
   // BAD
   import { useDispatch } from 'react-redux';
   import { useState } from 'react';
   ```

3. **Wrong**: Unalphabetized named imports

   ```javascript
   // BAD
   import { useState, useEffect, useCallback } from 'react';

   // GOOD
   import { useCallback, useEffect, useState } from 'react';
   ```

## Before Committing

Always run these commands before committing:

```bash
npm run format      # Format all files
npm run lint        # Check for errors
npm run lint:styles # Check CSS/SCSS
npm run test        # Run tests
```

Or run all at once:

```bash
npm run lint:all && npm run test
```

## Testing

- **Jest**: Used for React components and general logic (`npm run test:jest`)
- **Mocha**: Used for specific backend/legacy logic (`npm run test:mocha`)
- **Configuration**:
  - Jest config: `jest.config.cjs`
  - Babel config: `babel.config.json` (required for Next.js + Jest)
  - Test files have ESLint overrides for import order and globals.

## Accessibility

- Never skip heading levels (h1 -> h2 -> h3)
- Use semantic HTML (`<main>`, `<section>`, `<nav>`)
- All images need meaningful `alt` text
- Forms need proper labels

Run accessibility audit:

```bash
npm run a11y
```

## Code Style

- Use functional components with hooks
- Prefer early returns
- Keep components small and focused
- Use meaningful variable names

## Wrapped Data System

### Episode Counting (CRITICAL)

When working with AniList activity data, `progress` field semantics are:

- **`"9"`** → User watched episode 9 = **1 episode** (NOT 9 episodes!)
- **`"116 - 120"`** → User watched episodes 116-120 = **5 episodes** (calculate difference)
- **`null`** → No progress = **0 episodes**

**Never** use the progress number directly as episode count. Always use `parseEpisodesWatched()` from `wrappedDataProcessor.js`.

### Wrapped Data Processing

- Process **on-demand** (first visit to `/wrapped`, not during registration)
- Skip manga entries (no `duration` field)
- Validate calculations: `isNaN()`, `isFinite()`
- Cache results in MongoDB to avoid regeneration

### Common Pitfalls

1. **Wrong**: `episodesWatched = parseInt(progress)` → gives 120 for "116 - 120"
2. **Correct**: Calculate range difference → gives 5 for "116 - 120"
3. **Always** skip activities where `media.duration === 0` (manga)

See `ARCHITECTURE.md` for full system documentation.
