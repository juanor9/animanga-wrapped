'use client';

import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

/**
 * useTheme Hook
 * Custom hook to access year configuration
 *
 * @returns {Object} Year configuration
 * @returns {number} year - The current wrapped year
 * @returns {Object} config - The year configuration (colors, gradients, tokens)
 *
 * @throws {Error} If used outside of ThemeProvider
 *
 * @example
 * const { year, config } = useTheme();
 *
 * // Access colors
 * const primaryColor = config.colors.primary;
 *
 * // Access gradients
 * const chapterGradient = config.gradients.chapter1;
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context || !context.config) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
};

export default useTheme;
