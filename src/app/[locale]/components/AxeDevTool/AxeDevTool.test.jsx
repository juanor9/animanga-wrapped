import assert from 'node:assert/strict';
import test from 'node:test';
import { renderToString } from 'react-dom/server';
import AxeDevTool from './AxeDevTool';

test('AxeDevTool renders a hidden status message', () => {
  const html = renderToString(<AxeDevTool />);

  assert.ok(html.includes('Axe DevTool Active'));
});
