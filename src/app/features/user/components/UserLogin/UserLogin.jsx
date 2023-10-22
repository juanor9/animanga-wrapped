/* eslint-disable no-unused-vars */
import { useDispatch } from 'react-redux';
import { useState } from 'react';

const UserLogin = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const form = {
        email,
        password,
      };
      // console.log('🚀 ~ file: UserRegistration.jsx:23 ~ handleSubmit ~ form:', form);
      // dispatch(createUser(form));
      // navigate('/catalogue');
    } catch (error) {
      throw new Error(error);
    }
  };
  return (
    <section className="user-registration">
      <form
        action=""
        onSubmit={handleSubmit}
        className="user-registration__form"
      >
        <label htmlFor="mail" className="user-registration__label">
          Email
          <input
            className="user-registration__input"
            id="mail"
            name="mail"
            onChange={handleEmailChange}
            type="mail"
          />
        </label>
        <label htmlFor="password" className="user-registration__label">
          Password
          <input
            className="user-registration__input"
            id="password"
            name="password"
            onChange={handlePasswordChange}
            type="password"
          />
        </label>
        <button type="submit" className="user-registration__button">
          {' '}
          Login
        </button>
      </form>
    </section>
  );
};

export default UserLogin;
