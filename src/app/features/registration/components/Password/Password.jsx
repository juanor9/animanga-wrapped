import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { newUser } from '../../../../../redux/features/user';
import createUser from '../../services/registration';

const Password = ({ color }) => {
  const [password, setPassword] = useState(null);
  const { user } = useSelector((state) => state.UserReducer);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const { value } = event.target;
    setPassword(value);
  };

  const updateRedux = () => {
    if (password) {
      dispatch(newUser({ ...user, password }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    updateRedux();

    if (password) {
      const updatedUser = { ...user, password };
      dispatch(createUser(updatedUser));
    }
  };

  return (
    <div>
      <p>
        Alright, last piece of the puzzle!
        Let&apos;s set a sturdy password to safeguard your epic
        yearly stats. After this, we&apos;ll break down your
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
        <button
          type="submit"
          className={`register__button register__button--${color}`}
        >Save
        </button>
      </form>
    </div>
  );
};
export default Password;
