import { useTranslations } from 'next-intl';
import { useState } from 'react';
import TermsContent from '../../../../terms-and-conditions/TermsContent';
import './TermsAndConditions.scss';

const TermsAndConditions = ({ color, clickFunction }) => {
  const t = useTranslations('registration.terms');
  const [isChecked, setChecked] = useState(false);
  const handleCheckboxChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <div>
      <p>{t('message')}</p>
      <div className="register__formal-text">
        <TermsContent />
      </div>
      <form onSubmit={clickFunction}>
        <label htmlFor="accept">
          <input
            type="checkbox"
            name="acceptTerms"
            id="acceptTerms"
            className="register__checkbox"
            onChange={handleCheckboxChange}
          />
          {t('checkbox')}
          {isChecked !== true ? (
            <button type="submit" className="register__button register__button--disabled">
              {t('button')}
            </button>
          ) : (
            <button type="submit" className={`register__button register__button--${color}`}>
              {t('button')}
            </button>
          )}
        </label>
      </form>
    </div>
  );
};

export default TermsAndConditions;
