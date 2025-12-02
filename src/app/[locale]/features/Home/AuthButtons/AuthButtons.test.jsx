import assert from 'node:assert/strict';
import test from 'node:test';
import { renderToString } from 'react-dom/server';
import AuthButtons from './AuthButtons';

test('AuthButtons renders both provider links', () => {
  const html = renderToString(
    <AuthButtons ALClientId="anilist" MALClientId="mal" MALCodeChallenge="challenge" />
  );

  assert.ok(html.includes('Login with AniList'));
  assert.ok(html.includes('Login with MyAnimeList'));
});
