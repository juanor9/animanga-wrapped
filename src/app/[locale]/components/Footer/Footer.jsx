'use client';

import { useTranslations } from 'next-intl';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
import './Footer.scss';

const getTranslator = (translations) => (key) => translations?.[key] ?? key;

const Footer = ({ translations }) => {
  const t = translations ? getTranslator(translations) : useTranslations('footer');

  return (
    <footer className="footer">
      <LanguageSwitcher />
      <section className="footer__logo-container">
        <picture className="footer__logo">
          <img src="/AWM-logo.svg" alt={t('logoAlt')} />
        </picture>
        <p>{t('copyright')}</p>
      </section>
      <p>
        <a href="./terms-and-conditions">{t('termsAndConditions')}</a>
      </p>
      <p>
        <a href="./privacy-policy">{t('privacyPolicy')}</a>
      </p>
    </footer>
  );
};

export default Footer;
