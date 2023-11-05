import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import CountrySelect from './CountryDropdown';
import { newUser } from '../../../../../redux/features/user';

const Location = ({ color, step, clickFunction }) => {
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
      setErrorMessage('Please select a country.');
      return;
    }

    updateRedux();
    clickFunction(step + 1);
  };
  return (
    <div>
      <p>
        Where&apos;s your home base? Let us know your country and we&apos;re
        almost there!
      </p>
      <form onSubmit={handleSubmit}>
        <CountrySelect onChange={handleCountryChange} />
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <button
          type="submit"
          className={`register__button register__button--${color}`}
        >
          Next
        </button>
      </form>
    </div>
  );
};

export default Location;
