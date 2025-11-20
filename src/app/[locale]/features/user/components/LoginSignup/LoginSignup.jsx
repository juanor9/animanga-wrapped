'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import UserLogin from '../UserLogin/UserLogin';
import UserRegistration from '../UserRegistration/UserRegistration';
import './LoginSignup.scss';

const LoginSignup = () => {
  const t = useTranslations('auth');
  const [tab, setTab] = useState('signup');
  const handleClick = (tabValue) => {
    setTab(tabValue);
  };

  return (
    <>
      <div className="loginSignup__button-container">
        <button className="loginSignup__button" type="button" onClick={() => handleClick('signup')}>
          {t('signupTab')}
        </button>
        <button className="loginSignup__button" type="button" onClick={() => handleClick('login')}>
          {t('loginTab')}
        </button>
      </div>
      {tab === 'signup' ? <UserRegistration /> : null}
      {tab === 'login' ? <UserLogin /> : null}
    </>
  );
};

export default LoginSignup;
