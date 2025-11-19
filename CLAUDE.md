# Claude Code Instructions

## Important Rules

**NEVER skip linting rules.** Always fix errors properly instead of downgrading rules from "error" to "warn" or disabling them.

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
```

Or run all at once:

```bash
npm run lint:all
```

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
