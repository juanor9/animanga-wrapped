import assert from 'node:assert/strict';
import test from 'node:test';
import { renderToString } from 'react-dom/server';
import Stories from './Stories';

const sampleStories = [
  { id: '1', user: 'A', title: 'Story A', description: 'First story' },
  { id: '2', user: 'B', title: 'Story B', description: 'Second story' },
];

test('Stories renders the provided stories list', () => {
  const html = renderToString(
    <Stories loading={false} stories={sampleStories} onDelete={() => {}} />
  );

  assert.ok(html.includes('Story A'));
  assert.ok(html.includes('Story B'));
});
