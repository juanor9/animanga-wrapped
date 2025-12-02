import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CountrySelect from './CountryDropdown';
import { newUser } from '../../../../../../redux/features/user';

const Location = ({ color, step, clickFunction }) => {
  const t = useTranslations('registration.location');
  const { user } = useSelector((state) => state.UserReducer);
  const dispatch = useDispatch();

  const [country, setCountry] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleCountryChange = (selectedOption) => {
    setCountry(selectedOption.label);
  };

  const updateRedux = () => {
    if (country) {
      dispatch(newUser({ ...user, country }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!country) {
      setErrorMessage(t('error'));
      return;
    }

    updateRedux();
    clickFunction(step + 1);
  };
  return (
    <div>
      <p>{t('message')}</p>
      <form onSubmit={handleSubmit}>
        <CountrySelect onChange={handleCountryChange} placeholder={t('placeholder')} />
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <button type="submit" className={`register__button register__button--${color}`}>
          {t('button')}
        </button>
      </form>
    </div>
  );
};

export default Location;
