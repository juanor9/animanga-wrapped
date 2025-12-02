import { NextIntlClientProvider } from 'next-intl';
import Hero from './Hero';

const messages = {
  hero: {
    title: 'Track your anime journey',
    subtitle: 'Stay on top of your favorite series with ease',
  },
};

const meta = {
  title: 'Features/Home/Hero',
  component: Hero,
  decorators: [
    (Story) => (
      <NextIntlClientProvider locale="en" messages={messages}>
        <Story />
      </NextIntlClientProvider>
    ),
  ],
  tags: ['autodocs'],
};

export default meta;

export const Default = {};
