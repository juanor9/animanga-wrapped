// ============================================================================
// Animanga Wrapped - Year Configuration
// ============================================================================
// Configuration for each wrapped year (colors, gradients, tokens)
// Theme is automatically determined by the wrapped year, not user-selectable

/**
 * Year configuration structure:
 * - year: numeric year
 * - colors: color palette for this year
 * - gradients: gradient definitions
 * - tokens: design tokens (CTA, pills, etc.)
 */

export const YEAR_CONFIGS = {
  2024: {
    year: 2024,
    colors: {
      // Primary brand colors for 2024
      primary: '#e91e9e', // Hot pink
      secondary: '#7b5cff', // Purple
      accent: '#00bfa0', // Teal

      // Background colors
      bgDark: '#0d0d0d',
      bgDarker: '#050816',
      bgLight: '#e8e2d5',

      // Text colors
      textOnDark: '#ffffff',
      textOnLight: '#111111',
      textMuted: '#b3b3b3',

      // Accent colors
      yellow: '#ffd64d',
      orange: '#ff7a3c',
      lime: '#a8d93e',
      pink: '#e91e9e',
      teal: '#00bfa0',
      purple: '#7b5cff',
      cyan: '#00b8d4',

      // Decorative
      cream: '#fff5d6',
      hotPink: '#ff3ba7',
      limeNeon: '#b6ff3b',
      violetDeep: '#3b14a7',
    },
    gradients: {
      chapter1: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      chapter2: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      chapter3: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      chapter4: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      chapter5: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      chapter6: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
      chapter7: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      chapter8: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
      chapter9: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',

      // Utility gradients
      orange: 'linear-gradient(135deg, #ff7a3c 0%, #fc802d 100%)',
      green: 'linear-gradient(135deg, #a8d93e 0%, #5ad75f 100%)',
      yellow: 'linear-gradient(135deg, #ffd64d 0%, #f9f137 100%)',
      pink: 'linear-gradient(135deg, #e91e9e 0%, #ff97c9 100%)',
      purple: 'linear-gradient(135deg, #7b5cff 0%, #3b14a7 100%)',
      teal: 'linear-gradient(135deg, #00bfa0 0%, #00d4ba 100%)',
    },
    tokens: {
      // CTA colors
      ctaBg: '#111111',
      ctaText: '#ffffff',
      ctaBorder: '#ffd64d',

      // Pill colors
      pillBg: '#111111',
      pillText: '#ffd64d',

      // Club/Persona colors
      clubHexBorder: '#b6ff3b',
      clubHexFill: '#111111',
      clubBannerBg: '#b6ff3b',
      clubBannerText: '#111111',
    },
  },

  2025: {
    year: 2025,
    colors: {
      // Primary brand colors for 2025 (Spotify-inspired)
      primary: '#a8d93e', // Lime green
      secondary: '#8b7fc8', // Purple arc
      accent: '#ffd700', // Yellow

      // Background colors
      bgDark: '#2c2c2c',
      bgDarker: '#1a1a1a',
      bgLight: '#e8e2d5', // Beige

      // Text colors
      textOnDark: '#ffffff',
      textOnLight: '#111111',
      textMuted: '#f5f5f5',

      // Accent colors
      yellow: '#ffd700',
      orange: '#ff6633',
      lime: '#a8d93e',
      pink: '#ff5ed9',
      teal: '#16e0bd',
      purple: '#8b7fc8',
      cyan: '#33e1ff',

      // Decorative
      cream: '#f5f0e8',
      hotPink: '#ff5ed9',
      limeNeon: '#a8d93e',
      violetDeep: '#3b14a7',

      // Spotify 2025 specific
      beige: '#e8e2d5',
      beigeLight: '#f5f0e8',
      beigeDark: '#d4cec1',
      circleBlack: '#000000',
      circleRed: '#ff4444',
      circleOrange: '#ff6633',
      numberPurple: '#8b7fc8',
      numberBlue: '#6b8cff',
    },
    gradients: {
      chapter1: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      chapter2: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      chapter3: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      chapter4: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      chapter5: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      chapter6: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
      chapter7: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      chapter8: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
      chapter9: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',

      // Utility gradients
      orange: 'linear-gradient(135deg, #ff7a3c 0%, #fc802d 100%)',
      green: 'linear-gradient(135deg, #a8d93e 0%, #5ad75f 100%)',
      yellow: 'linear-gradient(135deg, #ffd64d 0%, #f9f137 100%)',
      pink: 'linear-gradient(135deg, #ff5ed9 0%, #ff97c9 100%)',
      purple: 'linear-gradient(135deg, #7b5cff 0%, #3b14a7 100%)',
      teal: 'linear-gradient(135deg, #16e0bd 0%, #00d4ba 100%)',
    },
    tokens: {
      // CTA colors
      ctaBg: '#111111',
      ctaText: '#ffffff',
      ctaBorder: '#a8d93e', // Lime instead of yellow

      // Pill colors
      pillBg: '#111111',
      pillText: '#a8d93e', // Lime instead of yellow

      // Club/Persona colors
      clubHexBorder: '#a8d93e',
      clubHexFill: '#111111',
      clubBannerBg: '#a8d93e',
      clubBannerText: '#111111',
    },
  },
};

/**
 * Get configuration for a specific year
 * @param {number} year - The wrapped year
 * @returns {Object} Year configuration
 */
export const getYearConfig = (year) => {
  return YEAR_CONFIGS[year] || YEAR_CONFIGS[2025]; // Default to 2025
};
