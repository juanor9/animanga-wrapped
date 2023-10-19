'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import createUser from '../services/users';

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
    <section>
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="mail">
          Email
          <input
            type="mail"
            name="mail"
            id="mail"
            onChange={handleEmailChange}
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            id="password"
            onChange={handlePasswordChange}
          />
        </label>
        <button type="submit"> Submit </button>
      </form>
    </section>
  );
};

export default UserRegistration;
