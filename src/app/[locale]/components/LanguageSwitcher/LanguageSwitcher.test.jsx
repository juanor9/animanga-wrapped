import assert from 'node:assert/strict';
import test from 'node:test';
import { renderToString } from 'react-dom/server';
import LanguageSwitcher from './LanguageSwitcher';

const renderSwitcher = (locale = 'en', pathname = '/en/demo') =>
  renderToString(<LanguageSwitcher locale={locale} pathname={pathname} onNavigate={() => {}} />);

test('LanguageSwitcher renders both language buttons', () => {
  const html = renderSwitcher('en', '/en/example');

  assert.ok(html.includes('EN'));
  assert.ok(html.includes('ES'));
});

test('LanguageSwitcher marks the active locale', () => {
  const html = renderSwitcher('es', '/es/example');

  assert.ok(html.includes('language-switcher__button--active'));
});
