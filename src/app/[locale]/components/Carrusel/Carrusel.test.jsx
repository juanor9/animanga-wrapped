import assert from 'node:assert/strict';
import test from 'node:test';
import { renderToString } from 'react-dom/server';
import Carrusel from './Carrusel';

test('Carrusel renders provided slides', () => {
  const html = renderToString(
    <Carrusel>
      <div className="slide">Slide 1</div>
      <div className="slide">Slide 2</div>
    </Carrusel>
  );

  assert.ok(html.includes('Slide 1'));
  assert.ok(html.includes('Slide 2'));
});
