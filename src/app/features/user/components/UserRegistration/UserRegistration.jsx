'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import createUser from '../../services/users';
import './UserRegistration.scss';

const UserRegistration = () => {
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
      dispatch(createUser(form));
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
          Create user
        </button>
      </form>
      <p>
        By registering you agree to our Terms and Conditions of Use and Privacy
        Policy. Please read them before registering.
      </p>
    </section>
  );
};

export default UserRegistration;
