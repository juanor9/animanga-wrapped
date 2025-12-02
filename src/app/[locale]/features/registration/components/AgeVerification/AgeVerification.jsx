import { useTranslations } from 'next-intl';
import './AgeVerification.scss';

const AgeVerification = ({ isAdult, setIsAdult, clickFunction }) => {
  const t = useTranslations('registration.ageVerification');

  const handleChange = (e) => {
    setIsAdult(e.target.checked);
  };

  return (
    <div className="age-verification">
      <h2>{t('title')}</h2>
      <p className="age-verification__description">{t('description')}</p>

      <div className="age-verification__warning">
        <span className="age-verification__warning-icon">⚠️</span>
        <p>{t('warning')}</p>
      </div>

      <label className="age-verification__checkbox">
        <input
          type="checkbox"
          checked={isAdult}
          onChange={handleChange}
          className="age-verification__input"
        />
        <span className="age-verification__label">{t('confirmation')}</span>
      </label>

      <button className="age-verification__button" onClick={clickFunction} disabled={!isAdult}>
        {t('continue')}
      </button>

      {!isAdult && <p className="age-verification__error">{t('required')}</p>}
    </div>
  );
};

export default AgeVerification;
