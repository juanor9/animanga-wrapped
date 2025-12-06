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
  const user = useSelector((state) => state.UserReducer?.user);

  const [email, setEmail] = useState('');

  useEffect(() => {
    const checkWrappedAndRedirect = async () => {
      if (!userToken) return;

      const anilistId = user?.anilistId;

      // If we don't have anilistId, default to user profile
      if (!anilistId) {
        router.push('/user');
        return;
      }

      try {
        const currentYear = new Date().getFullYear();
        const response = await fetch(`/api/wrapped?anilistId=${anilistId}&year=${currentYear}`);

        if (!response.ok) {
          // If wrapped API fails, default to user profile
          router.push('/user');
          return;
        }

        const data = await response.json();

        // If user has completed wrapped this year, go to profile
        // Otherwise (not_started or in_progress), show wrapped
        if (data.status === 'completed') {
          router.push('/user');
        } else {
          router.push('/wrapped');
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error checking wrapped status:', error);
        // Default to user profile on error
        router.push('/user');
      }
    };

    checkWrappedAndRedirect();
  }, [userToken, user, router]);

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
        <div className="user-registration__success">
          <h3 className="user-registration__success-title">{t('checkYourEmail')}</h3>
          <p className="user-registration__success-text">
            {t('magicLinkSent', { email: magicLinkEmail })}
          </p>
          <p className="user-registration__success-help">{t('magicLinkHelp')}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="user-registration__form">
          <p className="user-registration__instructions">{t('loginDescription')}</p>

          <label htmlFor="email" className="user-registration__label">
            {tCommon('email')}
            <input
              className="user-registration__input"
              id="email"
              name="email"
              onChange={handleEmailChange}
              type="email"
              value={email}
              placeholder="your@email.com"
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
