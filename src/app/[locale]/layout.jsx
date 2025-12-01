import '../global.scss';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, unstable_setRequestLocale } from 'next-intl/server';
import { yearString } from '@/app/lib/constants/year';
import AxeDevTool from './components/AxeDevTool/AxeDevTool';
import Footer from './components/Footer/Footer';
import ReduxProvider from './components/Provider/Provider';

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'es' }];
}

export async function generateMetadata({ params: { locale } }) {
  await getMessages({ locale });
  // Note: For real metadata, you'd use useTranslations or similar if available server-side,
  // or just access the messages object directly if structure is known.
  // For now, keeping the hardcoded strings but ensuring locale is used if needed.

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
  if (!['en', 'es'].includes(locale)) notFound();

  // Enable static rendering
  unstable_setRequestLocale(locale);

  // Load messages
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
