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
    <div className="loginSignup">
      <div className="loginSignup__header">
        <h2 className="loginSignup__title">
          {tab === 'signup' ? 'Create Your Account' : 'Welcome Back'}
        </h2>
        <p className="loginSignup__description">
          {tab === 'signup'
            ? 'Sign up to see your personalized anime wrapped for this year'
            : 'Log in to access your anime wrapped'}
        </p>
      </div>

      <div className="loginSignup__tabs">
        <button
          className={`loginSignup__tab ${tab === 'signup' ? 'loginSignup__tab--active' : ''}`}
          type="button"
          onClick={() => handleClick('signup')}
        >
          {t('signupTab')}
        </button>
        <button
          className={`loginSignup__tab ${tab === 'login' ? 'loginSignup__tab--active' : ''}`}
          type="button"
          onClick={() => handleClick('login')}
        >
          {t('loginTab')}
        </button>
      </div>

      <div className="loginSignup__content">
        {tab === 'signup' ? <UserRegistration /> : null}
        {tab === 'login' ? <UserLogin /> : null}
      </div>
    </div>
  );
};

export default LoginSignup;
