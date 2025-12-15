'use client';

import { createContext } from 'react';

/**
 * Theme Context
 * Provides year configuration throughout the app (read-only)
 */
export const ThemeContext = createContext({
  year: new Date().getFullYear(),
  config: null,
});
