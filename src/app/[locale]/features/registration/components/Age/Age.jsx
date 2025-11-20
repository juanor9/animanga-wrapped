'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

const Age = ({ color, clickFunction }) => {
  const t = useTranslations('registration.age');
  const tCommon = useTranslations('common');
  const [isChecked, setChecked] = useState(false);
  const handleCheckboxChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <div>
      <p>{t('question')}</p>
      <form onSubmit={clickFunction}>
        <label htmlFor="accept">
          <input
            type="checkbox"
            name="acceptTerms"
            id="acceptTerms"
            className="register__checkbox"
            onChange={handleCheckboxChange}
          />
          {t('confirmation')}
          {isChecked !== true ? (
            <button type="submit" className="register__button register__button--disabled">
              {tCommon('next')}
            </button>
          ) : (
            <button type="submit" className={`register__button register__button--${color}`}>
              {tCommon('next')}
            </button>
          )}
        </label>
      </form>
    </div>
  );
};

export default Age;
