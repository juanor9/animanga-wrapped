import { useTranslations } from 'next-intl';
import { COUNTRIES } from '../../../../../lib/constants/countries';
import './CountrySelect.scss';

const CountrySelect = ({ country, setCountry, email, setEmail, clickFunction }) => {
  const t = useTranslations('registration.countrySelect');

  const handleCountryChange = (e) => {
    setCountry(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const isValid = country && email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  return (
    <div className="country-select">
      <h2>{t('title')}</h2>
      <p className="country-select__description">{t('description')}</p>

      <div className="country-select__form">
        <div className="country-select__field">
          <label htmlFor="email">{t('emailLabel')}</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder={t('emailPlaceholder')}
            className="country-select__input"
            required
          />
        </div>

        <div className="country-select__field">
          <label htmlFor="country">{t('countryLabel')}</label>
          <select
            id="country"
            value={country}
            onChange={handleCountryChange}
            className="country-select__select"
            required
          >
            <option value="">{t('countryPlaceholder')}</option>
            {COUNTRIES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button className="country-select__button" onClick={clickFunction} disabled={!isValid}>
        {t('continue')}
      </button>
    </div>
  );
};

export default CountrySelect;
