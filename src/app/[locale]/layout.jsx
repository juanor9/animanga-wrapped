import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { yearString } from '@/app/lib/constants/year';
import AxeDevTool from './components/AxeDevTool/AxeDevTool';
import Footer from './components/Footer/Footer';
import ReduxProvider from './components/Provider/Provider';
import '../global.scss';

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'es' }];
}

export async function generateMetadata() {
  return {
    metadataBase: new URL('https://animanga-wrapped.vercel.app'),
    title: 'Year Anime Manga Wrapped - The Best of Your Year in Anime and Manga',
    description: `Explore your anime and manga journey in ${yearString} with Year Anime Manga Wrapped. Connect with Anilist, discover personalized statistics, and share your year's top anime and manga with friends.`,
    keywords:
      'anime, manga, year review, Anilist, wrapped, personalized statistics, top anime, top manga, anime fans, manga readers',
    og: {
      type: 'website',
      url: 'https://animanga-wrapped.vercel.app',
      title: 'Year Anime Manga Wrapped - The Best of Your Year in Anime and Manga',
      description: `Explore your anime and manga journey in ${yearString} with Year Anime Manga Wrapped. Connect with Anilist, discover personalized statistics, and share your year's top anime and manga with friends.`,
      image: '/AWM-logo.svg',
    },
    twitter: {
      cardType: 'summary_large_image',
      title: 'Year Anime Manga Wrapped - The Best of Your Year in Anime and Manga',
      description: `Explore your anime and manga journey in ${yearString} with Year Anime Manga Wrapped. Connect with Anilist, discover personalized statistics, and share your year's top anime and manga with friends.`,
      image: '/AWM-logo.svg',
    },
  };
}

export default async function LocaleLayout({ children, params: { locale } }) {
  // Validate locale
  const validLocales = ['en', 'es'];
  if (!validLocales.includes(locale)) {
    notFound();
  }

  // Get messages for the locale
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <ReduxProvider>
            <AxeDevTool />
            {children}
          </ReduxProvider>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
