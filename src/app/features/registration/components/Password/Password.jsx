import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { newUser } from '../../../../../redux/features/user';
import createUser from '../../services/registration';
import { login } from '../../../user/services/users';

const Password = ({ color }) => {
  const [password, setPassword] = useState(null);
  const { user } = useSelector((state) => state.UserReducer);
  const { userToken, error } = useSelector((state) => state.userData);
  const dispatch = useDispatch();
  const router = useRouter();

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
    if (!fulfillment.payload.errors) {
      dispatch(login(form));
    }
    // Errors will be handled by the global state and displayed in the UI
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    updateRedux();

    if (password) {
      const updatedUser = { ...user, password };
      const newUserFulfilled = await createUserAtSubmit(updatedUser);
      const { email } = updatedUser;
      const form = { email, password };
      loginUserAfterRegistration(form, newUserFulfilled);
    }
  };

  useEffect(() => {
    if (userToken) {
      router.push('./user');
    }
  }, [userToken, router]);

  return (
    <div>
      <p>
        Alright, last piece of the puzzle! Let&apos;s set a sturdy password to
        safeguard your epic yearly stats. After this, we&apos;ll break down your
        anime and manga journey for the year!
      </p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            id="password"
            onChange={handleChange}
          />
        </label>
        {error && <p className="user-registration__error">{error}</p>}
        <button
          type="submit"
          className={`register__button register__button--${color}`}
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default Password;
