import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n.js');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // async rewrites() {
  //   return [
  //     {
  //       source: '/api/myanimelist/v1/oauth2/token',
  //       destination: 'https://myanimelist.net/v1/oauth2/token',
  //     }
  //   ];
  // },
  // Sass configuration to resolve imports from src/app
  sassOptions: {
    includePaths: ['./src/app'],
  },
  // // Otras configuraciones existentes
};

export default withNextIntl(nextConfig);
