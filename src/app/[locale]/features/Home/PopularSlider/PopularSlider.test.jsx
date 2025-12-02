import assert from 'node:assert/strict';
import test from 'node:test';
import { renderToString } from 'react-dom/server';
import PopularSliderClient from './PopularSliderClient';

const popularAnime = [
  {
    id: 1,
    title: { romaji: 'Chainsaw Man' },
    coverImage: { large: 'https://placehold.co/280x400?text=Chainsaw+Man' },
  },
];

const popularManga = [
  {
    id: 2,
    title: { romaji: 'Vagabond' },
    coverImage: { large: 'https://placehold.co/280x400?text=Vagabond' },
  },
];

test('PopularSliderClient renders anime and manga lists', () => {
  const html = renderToString(
    <PopularSliderClient popularAnime={popularAnime} popularManga={popularManga} />, 
  );

  assert.ok(html.includes('Popular Anime This Year'));
  assert.ok(html.includes('Popular Manga This Year'));
  assert.ok(html.includes('Chainsaw Man'));
  assert.ok(html.includes('Vagabond'));
});
