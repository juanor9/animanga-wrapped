'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import './LanguageSwitcher.scss';

const LanguageSwitcher = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const switchLanguage = (newLocale) => {
    // Remove the current locale from the pathname
    const pathWithoutLocale = pathname.replace(`/${locale}`, '');
    // Navigate to the new locale
    router.push(`/${newLocale}${pathWithoutLocale || '/'}`);
  };
  return (
    <div className="language-switcher">
      <button
        type="button"
        onClick={() => switchLanguage('en')}
        className={`language-switcher__button ${locale === 'en' ? 'language-switcher__button--active' : ''}`}
        aria-label="Switch to English"
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => switchLanguage('es')}
        className={`language-switcher__button ${locale === 'es' ? 'language-switcher__button--active' : ''}`}
        aria-label="Cambiar a Español"
      >
        ES
      </button>
    </div>
  );
};
export default LanguageSwitcher;
