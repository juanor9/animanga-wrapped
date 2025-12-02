import { useTranslations } from 'next-intl';
import { useState } from 'react';
import PrivacyPolicyContent from '../../../../privacy-policy/PrivacyPolicyContent';

const PrivacyPolicy = ({ color, clickFunction }) => {
  const t = useTranslations('registration.privacy');
  const [isChecked, setChecked] = useState(false);
  const handleCheckboxChange = (event) => {
    setChecked(event.target.checked);
  };
  return (
    <div>
      <p>{t('message')}</p>
      <form onSubmit={clickFunction}>
        <label htmlFor="accept">
          <div className="register__formal-text">
            <PrivacyPolicyContent />
          </div>
          <input
            type="checkbox"
            name="acceptPolicy"
            id="acceptPolicy"
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

export default PrivacyPolicy;
