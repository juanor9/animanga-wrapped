import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { newUser } from '../../../../../redux/features/user';

const Email = ({ color, step, clickFunction }) => {
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
      <p>
        Just pop in your email for us.
        Don&apos;t worry, we&apos;ll treat it like a
        limited edition manga – with utmost care.

      </p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            id="email"
            onChange={handleOnChange}
          />
        </label>
        <button
          type="submit"
          className={`register__button register__button--${color}`}
        >Submit
        </button>
      </form>

    </div>
  );
};

export default Email;
