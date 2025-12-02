import assert from 'node:assert/strict';
import test from 'node:test';
import { renderToString } from 'react-dom/server';
import Footer from './Footer';

const translations = {
  logoAlt: 'Logo alt text',
  copyright: 'Copyright text',
  termsAndConditions: 'Terms',
  privacyPolicy: 'Privacy',
};

test('Footer renders translated labels', () => {
  const html = renderToString(<Footer translations={translations} />);

  assert.ok(html.includes('Logo alt text'));
  assert.ok(html.includes('Copyright text'));
  assert.ok(html.includes('Terms'));
  assert.ok(html.includes('Privacy'));
});
