import assert from 'node:assert/strict';
import test from 'node:test';
import { renderToString } from 'react-dom/server';
import Spinner from './Spinner';

test('Spinner renders a spinner container', () => {
  const html = renderToString(<Spinner />);

  assert.ok(html.includes('spinner'));
});
