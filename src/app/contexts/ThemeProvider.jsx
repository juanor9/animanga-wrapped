'use client';

import { useEffect, useMemo } from 'react';
import { ThemeContext } from './ThemeContext';
import { getYearConfig } from '../config/themes';

/**
 * Apply year configuration to document root via CSS custom properties
 */
const applyConfigToDOM = (config) => {
  if (typeof document === 'undefined') return;

  const root = document.documentElement;

  // Apply color variables
  Object.entries(config.colors).forEach(([key, value]) => {
    root.style.setProperty(`--theme-color-${key}`, value);
  });

  // Apply gradient variables
  Object.entries(config.gradients).forEach(([key, value]) => {
    root.style.setProperty(`--theme-gradient-${key}`, value);
  });

  // Apply token variables
  Object.entries(config.tokens).forEach(([key, value]) => {
    root.style.setProperty(`--theme-token-${key}`, value);
  });

  // Set year as data attribute for CSS selectors
  root.setAttribute('data-wrapped-year', config.year);
};

/**
 * ThemeProvider Component
 * Automatically applies year configuration based on wrapped year
 * @param {number} year - The wrapped year (from backend data)
 * @param {ReactNode} children - Child components
 */
export const ThemeProvider = ({ year, children }) => {
  // Get configuration for the specified year
  const yearConfig = useMemo(() => getYearConfig(year), [year]);

  // Apply configuration to DOM whenever year changes
  useEffect(() => {
    applyConfigToDOM(yearConfig);
  }, [yearConfig]);

  // Provide year config to context (read-only, no setTheme)
  const contextValue = useMemo(
    () => ({
      year: yearConfig.year,
      config: yearConfig,
    }),
    [yearConfig]
  );

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
};

export default ThemeProvider;
