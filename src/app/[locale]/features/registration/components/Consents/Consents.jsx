import Link from 'next/link';
import { useTranslations } from 'next-intl';
import './Consents.scss';

const Consents = ({
  termsAccepted,
  setTermsAccepted,
  privacyAccepted,
  setPrivacyAccepted,
  clickFunction,
  isSubmitting,
}) => {
  const t = useTranslations('registration.consents');

  const isValid = termsAccepted && privacyAccepted;

  return (
    <div className="consents">
      <h2>{t('title')}</h2>
      <p className="consents__description">{t('description')}</p>

      <div className="consents__checkboxes">
        <label className="consents__checkbox">
          <input
            type="checkbox"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
            className="consents__input"
          />
          <span className="consents__label">
            {t('termsPrefix')}{' '}
            <Link href="/terms-and-conditions" target="_blank" className="consents__link">
              {t('termsLink')}
            </Link>
          </span>
        </label>

        <label className="consents__checkbox">
          <input
            type="checkbox"
            checked={privacyAccepted}
            onChange={(e) => setPrivacyAccepted(e.target.checked)}
            className="consents__input"
          />
          <span className="consents__label">
            {t('privacyPrefix')}{' '}
            <Link href="/privacy-policy" target="_blank" className="consents__link">
              {t('privacyLink')}
            </Link>
          </span>
        </label>
      </div>

      {!isValid && <p className="consents__error">{t('required')}</p>}

      <button
        className="consents__button"
        onClick={clickFunction}
        disabled={!isValid || isSubmitting}
      >
        {isSubmitting ? t('submitting') : t('submit')}
      </button>
    </div>
  );
};

export default Consents;
