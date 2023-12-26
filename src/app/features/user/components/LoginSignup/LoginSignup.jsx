'use client';

import { useState } from 'react';
import UserRegistration from '../UserRegistration/UserRegistration';
import UserLogin from '../UserLogin/UserLogin';
import './LoginSignup.scss';

const LoginSignup = () => {
  const [tab, setTab] = useState('signup');
  const handleClick = (tabValue) => {
    setTab(tabValue);
  };

  return (
    <>
      <div className="loginSignup__button-container">
        <button className="loginSignup__button" type="button" onClick={() => handleClick('signup')}>Sign Up</button>
        <button className="loginSignup__button" type="button" onClick={() => handleClick('login')}>Login</button>
      </div>
      {tab === 'signup'
        ? <UserRegistration />
        : null}
      {tab === 'login'
        ? <UserLogin />
        : null}
    </>
  );
};

export default LoginSignup;
