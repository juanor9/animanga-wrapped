import assert from 'node:assert/strict';
import test from 'node:test';
import { renderToString } from 'react-dom/server';
import PopularAnimeCard from './PopularAnimeCard';

const sampleItem = {
  id: 42,
  title: { romaji: 'Cowboy Bebop' },
  coverImage: { large: 'https://placehold.co/300x420' },
};

test('PopularAnimeCard renders image and title', () => {
  const html = renderToString(<PopularAnimeCard item={sampleItem} />);

  assert.ok(html.includes('Cowboy Bebop'));
  assert.ok(html.includes(sampleItem.coverImage.large));
});

const longTitle = {
  ...sampleItem,
  title: { romaji: 'An Extraordinarily Long Anime Name That Should Be Trimmed For Layout' },
};

test('PopularAnimeCard truncates long titles', () => {
  const expectedTitle = 'An Extraordinarily Long Anime Na...';
  const html = renderToString(<PopularAnimeCard item={longTitle} />);

  assert.ok(html.includes(expectedTitle));
  assert.ok(!html.includes(longTitle.title.romaji));
});
