import assert from 'node:assert/strict';
import test from 'node:test';
import { renderToString } from 'react-dom/server';
import ReduxProvider from './Provider';

test('Provider renders children content', () => {
  const html = renderToString(
    <ReduxProvider>
      <span>Child content</span>
    </ReduxProvider>
  );

  assert.ok(html.includes('Child content'));
});
