import assert from 'node:assert/strict';
import test from 'node:test';
import { NextIntlClientProvider } from 'next-intl';
import { renderToString } from 'react-dom/server';
import Hero from './Hero';

const messages = {
  hero: {
    title: 'Hero Title',
    subtitle: 'Hero Subtitle',
  },
};

test('Hero renders translated headline and subtitle', () => {
  const html = renderToString(
    <NextIntlClientProvider locale="en" messages={messages}>
      <Hero />
    </NextIntlClientProvider>
  );

  assert.ok(html.includes('Hero Title'));
  assert.ok(html.includes('Hero Subtitle'));
});
