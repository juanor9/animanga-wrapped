'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import './ConsentAndAge.scss';

const ConsentAndAge = ({ color, clickFunction }) => {
  const t = useTranslations('registration.consentAndAge');
  const [consents, setConsents] = useState({
    terms: false,
    privacy: false,
    age: false,
  });

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setConsents((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const allConsentsAccepted = consents.terms && consents.privacy && consents.age;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (allConsentsAccepted) {
      console.log('🔍 Consent data being sent:', consents);
      clickFunction(event, consents);
    }
  };

  return (
    <div className="consent-and-age">
      <h2>{t('title')}</h2>
      <p className="consent-and-age__subtitle">{t('subtitle')}</p>

      <form onSubmit={handleSubmit} className="consent-and-age__form">
        <div className="consent-and-age__checkboxes">
          <label htmlFor="terms" className="consent-and-age__label">
            <input
              type="checkbox"
              name="terms"
              id="terms"
              className="consent-and-age__checkbox"
              checked={consents.terms}
              onChange={handleCheckboxChange}
            />
            <span className="consent-and-age__text">
              {t('termsLabel')}{' '}
              <a
                href="/terms-and-conditions"
                target="_blank"
                rel="noopener noreferrer"
                className="consent-and-age__link"
              >
                {t('termsLink')}
              </a>
            </span>
          </label>

          <label htmlFor="privacy" className="consent-and-age__label">
            <input
              type="checkbox"
              name="privacy"
              id="privacy"
              className="consent-and-age__checkbox"
              checked={consents.privacy}
              onChange={handleCheckboxChange}
            />
            <span className="consent-and-age__text">
              {t('privacyLabel')}{' '}
              <a
                href="/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="consent-and-age__link"
              >
                {t('privacyLink')}
              </a>
            </span>
          </label>

          <label htmlFor="age" className="consent-and-age__label">
            <input
              type="checkbox"
              name="age"
              id="age"
              className="consent-and-age__checkbox"
              checked={consents.age}
              onChange={handleCheckboxChange}
            />
            <span className="consent-and-age__text">{t('ageLabel')}</span>
          </label>
        </div>

        <button
          type="submit"
          className={`register__button register__button--${color} ${!allConsentsAccepted ? 'register__button--disabled' : ''}`}
          disabled={!allConsentsAccepted}
        >
          {t('button')}
        </button>
      </form>
    </div>
  );
};

export default ConsentAndAge;
