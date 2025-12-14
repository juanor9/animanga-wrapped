import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n.js');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Sass configuration to resolve imports from src/app
  sassOptions: {
    includePaths: ['./src/app'],
  },

  // Performance optimizations
  compiler: {
    // Remove console.log in production
    removeConsole:
      process.env.NODE_ENV === 'production'
        ? {
            exclude: ['error', 'warn'],
          }
        : false,

    // Remove React properties in production
    reactRemoveProperties: process.env.NODE_ENV === 'production',
  },

  // Use SWC minifier (faster than Terser)
  swcMinify: true,

  // Optimize images
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },

  // Enable compression
  compress: true,

  // Production optimizations
  productionBrowserSourceMaps: false,

  // Optimize bundle
  experimental: {
    optimizePackageImports: [
      'react',
      'react-dom',
      'next-intl',
      'framer-motion',
      'chart.js',
      'react-chartjs-2',
      '@reduxjs/toolkit',
      'react-redux',
      '@apollo/client',
      'gsap',
    ],

    // Enable CSS optimization (disabled due to build errors)
    // optimizeCss: true,

    // Optimize server components
    serverComponentsExternalPackages: ['mongoose', 'bcryptjs', 'nodemailer', 'jsonwebtoken'],
  },

  // Power-saving mode for development
  poweredByHeader: false,

  // Optimize CSS and imports
  modularizeImports: {
    'react-icons': {
      transform: 'react-icons/{{member}}',
    },
    lodash: {
      transform: 'lodash/{{member}}',
    },
  },
};

export default withNextIntl(nextConfig);
