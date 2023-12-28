import './global.scss';
// import { Analytics } from '@vercel/analytics';
// import { SpeedInsights } from '@vercel/speed-insights';
import Footer from './components/Footer/Footer';
import ReduxProvider from './components/Provider/Provider';

export const metadata = {
  title: 'Year Anime Manga Wrapped - The Best of Your Year in Anime and Manga',
  description: 'Explore your anime and manga journey in 2023 with Year Anime Manga Wrapped. Connect with Anilist, discover personalized statistics, and share your year’s top anime and manga with friends.',
  keywords: 'anime, manga, year review, Anilist, wrapped, personalized statistics, top anime, top manga, anime fans, manga readers',
  og: {
    type: 'website',
    url: 'https://animanga-wrapped.vercel.app',
    title: 'Year Anime Manga Wrapped - The Best of Your Year in Anime and Manga',
    description: 'Explore your anime and manga journey in 2023 with Year Anime Manga Wrapped. Connect with Anilist, discover personalized statistics, and share your year’s top anime and manga with friends.',
    image: '/AWM-logo.svg',
  },
  twitter: {
    cardType: 'summary_large_image',
    // site: '@YourTwitterHandle',
    title: 'Year Anime Manga Wrapped - The Best of Your Year in Anime and Manga',
    description: 'Explore your anime and manga journey in 2023 with Year Anime Manga Wrapped. Connect with Anilist, discover personalized statistics, and share your year’s top anime and manga with friends.',
    image: '/AWM-logo.svg',
  },
};

const RootLayout = ({ children }) => (
  <html lang="en">
    <body>
      <ReduxProvider>
        {children}
      </ReduxProvider>
      <Footer />
      {/* <SpeedInsights />
      <Analytics /> */}
    </body>
  </html>
);

export default RootLayout;
