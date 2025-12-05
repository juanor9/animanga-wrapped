'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../components/Spinner/Spinner';
import { verifyMagicLink } from '../features/user/services/users';

export default function VerifyLogin() {
  const t = useTranslations('auth');
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const { error, userToken } = useSelector((state) => state.userData);
  const [isVerifying, setIsVerifying] = useState(true);

  const token = searchParams.get('token');

  useEffect(() => {
    if (token && isVerifying) {
      dispatch(verifyMagicLink(token)).then((result) => {
        setIsVerifying(false);
        if (verifyMagicLink.fulfilled.match(result)) {
          // Successful verification, will redirect via userToken effect
        }
      });
    } else if (!token) {
      setIsVerifying(false);
    }
  }, [token, dispatch, isVerifying]);

  useEffect(() => {
    if (userToken) {
      router.push('./user');
    }
  }, [userToken, router]);

  return (
    <div className="verify-login">
      <div className="verify-login__container">
        {isVerifying ? (
          <>
            <Spinner />
            <h2>{t('verifyingLogin')}</h2>
            <p>{t('pleaseWait')}</p>
          </>
        ) : error ? (
          <>
            <h2>{t('verificationFailed')}</h2>
            <p className="verify-login__error">{error}</p>
            <button onClick={() => router.push('./login')} className="verify-login__button">
              {t('backToLogin')}
            </button>
          </>
        ) : userToken ? (
          <>
            <h2>{t('loginSuccess')}</h2>
            <p>{t('redirecting')}</p>
          </>
        ) : (
          <>
            <h2>{t('invalidLink')}</h2>
            <p>{t('invalidLinkMessage')}</p>
            <button onClick={() => router.push('./login')} className="verify-login__button">
              {t('backToLogin')}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
