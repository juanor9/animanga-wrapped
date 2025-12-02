import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { newUser } from '../../../../../../redux/features/user';

const Email = ({ color, step, clickFunction }) => {
  const t = useTranslations('registration.email');
  const { user } = useSelector((state) => state.UserReducer);
  const dispatch = useDispatch();

  const [userEmail, setUserEmail] = useState('');

  const handleOnChange = (event) => {
    const { value } = event.target;
    setUserEmail(value);
  };

  const updateRedux = () => {
    if (userEmail !== '') {
      dispatch(newUser({ ...user, email: userEmail }));
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    updateRedux();
    clickFunction(step + 1);
  };

  return (
    <div>
      <p>{t('message')}</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">
          {t('label')}
          <input type="email" name="email" id="email" onChange={handleOnChange} />
        </label>
        <button type="submit" className={`register__button register__button--${color}`}>
          {t('button')}
        </button>
      </form>
    </div>
  );
};

export default Email;
