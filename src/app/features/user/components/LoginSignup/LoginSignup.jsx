'use client';

import { useState } from 'react';
import UserRegistration from '../UserRegistration/UserRegistration';
import UserLogin from '../UserLogin/UserLogin';

const LoginSignup = () => {
  const [tab, setTab] = useState('signup');
  const handleClick = (tabValue) => {
    setTab(tabValue);
  };

  return (
    <>
      <div>
        <button type="button" onClick={() => handleClick('signup')}>Sign Up</button>
        <button type="button" onClick={() => handleClick('login')}>Login</button>
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
