import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { newUser } from '../../../../../../redux/features/user';
import { clearInfoMessage } from '../../../user/reducer/userSlice';
import { login } from '../../../user/services/users';
import createUser from '../../services/registration';

const Password = ({ color }) => {
  const t = useTranslations('registration.password');
  const tCommon = useTranslations('common');
  const [password, setPassword] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useSelector((state) => state.UserReducer);
  const { userToken, error, infoMessage } = useSelector((state) => state.userData);
  const dispatch = useDispatch();
  const router = useRouter();

  // Clear the info message when the component unmounts
  useEffect(
    () => () => {
      dispatch(clearInfoMessage());
    },
    [dispatch]
  );

  const handleChange = (event) => {
    const { value } = event.target;
    setPassword(value);
  };

  const updateRedux = () => {
    if (password) {
      dispatch(newUser({ ...user, password }));
    }
  };

  const createUserAtSubmit = async (newUserToCreate) => {
    const createUserDispatch = await dispatch(createUser(newUserToCreate));
    return createUserDispatch;
  };

  const loginUserAfterRegistration = (form, fulfillment) => {
    // Only login if the user was successfully created
    if (fulfillment.payload && fulfillment.payload.user) {
      dispatch(login(form));
    }
    // If there's a message (e.g., duplicate email), it will be handled by the global state
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    updateRedux();

    if (password) {
      try {
        const updatedUser = { ...user, password };
        const newUserFulfilled = await createUserAtSubmit(updatedUser);
        const { email } = updatedUser;
        const form = { email, password };
        loginUserAfterRegistration(form, newUserFulfilled);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (userToken) {
      router.push('./user');
    }
  }, [userToken, router]);

  return (
    <div>
      <p>{t('message')}</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="password">
          {t('label')}
          <input
            type="password"
            name="password"
            id="password"
            onChange={handleChange}
            autoComplete="new-password"
          />
        </label>
        {/* Display the info message if it exists */}
        {infoMessage && <p className="user-registration__info">{infoMessage}</p>}
        {error && <p className="user-registration__error">{error}</p>}
        <button
          type="submit"
          className={`register__button register__button--${color}`}
          disabled={isLoading}
        >
          {isLoading ? tCommon('loading') : t('button')}
        </button>
      </form>
    </div>
  );
};

export default Password;
