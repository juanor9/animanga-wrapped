'use client';

import { useTranslations } from 'next-intl';

const First = ({ color, clickFunction }) => {
  const t = useTranslations('registration.welcome');

  return (
    <div>
      <h2>{t('title')}</h2>
      <p>{t('message')}</p>
      <button
        type="button"
        className={`register__button register__button--${color}`}
        onClick={clickFunction}
      >
        {t('button')}
      </button>
    </div>
  );
};

export default First;
