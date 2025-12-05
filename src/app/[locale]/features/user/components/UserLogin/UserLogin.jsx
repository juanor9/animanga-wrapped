'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendMagicLink } from '../../services/users';

const UserLogin = () => {
  const t = useTranslations('auth');
  const tCommon = useTranslations('common');
  const dispatch = useDispatch();
  const router = useRouter();
  const { error, magicLinkSent, magicLinkEmail, userToken, loading } = useSelector(
    (state) => state.userData
  );

  const [email, setEmail] = useState('');

  useEffect(() => {
    if (userToken) {
      router.push('./user');
    }
  }, [userToken, router]);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (email) {
      dispatch(sendMagicLink(email));
    }
  };

  return (
    <section className="user-registration">
      {magicLinkSent ? (
        <div className="user-registration__magic-link-sent">
          <h2>{t('checkYourEmail')}</h2>
          <p>{t('magicLinkSent', { email: magicLinkEmail })}</p>
          <p className="user-registration__help">{t('magicLinkHelp')}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="user-registration__form">
          <h2>{t('loginTitle')}</h2>
          <p className="user-registration__description">{t('loginDescription')}</p>

          <label htmlFor="email" className="user-registration__label">
            {tCommon('email')}
            <input
              className="user-registration__input"
              id="email"
              name="email"
              onChange={handleEmailChange}
              type="email"
              value={email}
              required
              disabled={loading}
            />
          </label>

          {error && <p className="user-registration__error">{error}</p>}

          <button type="submit" className="user-registration__button" disabled={!email || loading}>
            {loading ? tCommon('loading') : t('sendMagicLink')}
          </button>
        </form>
      )}
    </section>
  );
};

export default UserLogin;
