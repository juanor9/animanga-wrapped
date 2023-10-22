/* eslint-disable no-unused-vars */

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
      <button type="submit" className="user-registration__button">
        {' '}
        Create user
      </button>
    </section>
  );
};

export default UserRegistration;
