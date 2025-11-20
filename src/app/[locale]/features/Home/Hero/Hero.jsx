'use client';

import { useTranslations } from 'next-intl';
import LoginSignup from '../../user/components/LoginSignup/LoginSignup';
import './Hero.scss';

const Hero = () => {
  const t = useTranslations('hero');

  return (
    <section className="hero">
      <article className="hero__copy">
        <h1 className="hero__header">{t('title')}</h1>
        <p>{t('subtitle')}</p>
      </article>
      <article className="hero__forms">
        <LoginSignup />
      </article>
    </section>
  );
};

export default Hero;
