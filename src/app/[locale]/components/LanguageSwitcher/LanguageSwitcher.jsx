'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import './LanguageSwitcher.scss';

const LanguageSwitcher = ({ locale: localeProp, pathname: pathnameProp, onNavigate }) => {
  const localeHook = useLocale();
  const pathnameHook = usePathname();

  const locale = localeProp ?? localeHook;
  const router = useRouter();
  const pathname = pathnameProp ?? pathnameHook;

  const switchLanguage = (newLocale) => {
    const pathWithoutLocale = pathname.replace(`/${locale}`, '');
    const nextPath = `/${newLocale}${pathWithoutLocale || '/'}`;

    if (onNavigate) {
      onNavigate(nextPath);
      return;
    }

    router.push(nextPath);
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
