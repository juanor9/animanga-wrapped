'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { newUser } from '../../../redux/features/user';
import ConsentAndAge from '../features/registration/components/ConsentAndAge/ConsentAndAge';
import RegistrationForm from '../features/registration/components/RegistrationForm/RegistrationForm';
import './page.scss';

const variants = {
  enter: (direction) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
  }),
};

const Register = () => {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(0);
  const [isProcessingOAuth, setIsProcessingOAuth] = useState(false);
  const [oauthError, setOauthError] = useState('');
  const [mounted, setMounted] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.UserReducer);

  const handleClick = (event, consentData) => {
    if (event && event.preventDefault) {
      event.preventDefault();
    }

    // Dispatch consent data to Redux if provided
    if (consentData) {
      const reduxData = {
        isAdult: consentData.age,
        termsAccepted: consentData.terms,
        privacyAccepted: consentData.privacy,
      };

      // IMPORTANT: Save to localStorage to persist across OAuth redirect
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('consentData', JSON.stringify(reduxData));
      }

      dispatch(newUser(reduxData));
    }

    setDirection(1);
    setStep(step + 1);
  };

  // Auto-advance to step 2 if user has AniList data
  useEffect(() => {
    if (user?.anilistId) {
      setStep(2);
    }
  }, [user]);

  // Restore step from localStorage on mount (before OAuth processing)
  useEffect(() => {
    const savedStep = window.localStorage.getItem('registrationStep');
    if (savedStep) {
      setStep(parseInt(savedStep, 10));
    }

    // Restore consent data from localStorage
    const savedConsent = window.localStorage.getItem('consentData');
    if (savedConsent) {
      try {
        const consentData = JSON.parse(savedConsent);

        dispatch(newUser(consentData));
      } catch (error) {
        console.error('Failed to parse consent data from localStorage:', error);
      }
    }

    setMounted(true);
  }, [dispatch]);

  // Handle AniList OAuth callback and restore step
  useEffect(() => {
    const processOAuthCallback = async () => {
      // Check if we're coming back from AniList OAuth
      const hash = window.location.hash;
      if (hash && hash.includes('access_token')) {
        setIsProcessingOAuth(true);
        setOauthError('');

        try {
          // Extract access token from hash
          const params = new URLSearchParams(hash.substring(1));
          const accessToken = params.get('access_token');

          if (accessToken) {
            // Call our API to get AniList user data
            const apiUrl = '/api/auth/anilist/callback';

            const response = await fetch(apiUrl, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ accessToken }),
            });

            if (response.ok) {
              const anilistData = await response.json();

              // Store AniList data in Redux
              const anilistReduxData = {
                anilistId: anilistData.anilistId,
                anilistUsername: anilistData.anilistUsername,
                anilistAvatar: anilistData.anilistAvatar,
                anilistAccessToken: anilistData.anilistAccessToken,
                anilistTokenExpiry: anilistData.anilistTokenExpiry,
              };

              dispatch(newUser(anilistReduxData));

              // Clear localStorage after successful OAuth
              window.localStorage.removeItem('registrationStep');

              // Clean up URL hash
              window.history.replaceState(null, '', window.location.pathname);
            } else {
              const errorData = await response.json();
              setOauthError(
                errorData.error || 'Failed to connect your AniList account. Please try again.'
              );
              // Clean up URL hash even on error
              window.history.replaceState(null, '', window.location.pathname);
            }
          }
        } catch (error) {
          setOauthError(
            'An error occurred while connecting your AniList account. Please try again.'
          );
          // Clean up URL hash even on error
          window.history.replaceState(null, '', window.location.pathname);
        } finally {
          setIsProcessingOAuth(false);
        }
      }
    };

    processOAuthCallback();
  }, [dispatch]);

  return (
    <motion.main
      className="register"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <h1>Create User</h1>
      <div className="register__container">
        {!mounted || isProcessingOAuth ? (
          <div className="register__loading">
            <p>{isProcessingOAuth ? 'Connecting your AniList account...' : 'Loading...'}</p>
          </div>
        ) : oauthError ? (
          <div className="register__error">
            <p>{oauthError}</p>
            <button
              type="button"
              className="register__button register__button--pink"
              onClick={() => {
                setOauthError('');
                setStep(2);
              }}
            >
              Try Again
            </button>
          </div>
        ) : (
          <AnimatePresence initial={false} custom={direction} mode="wait">
            {step === 1 ? (
              <motion.section
                key="step1"
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: 'spring', stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                className="register__section register__section--green"
              >
                <ConsentAndAge color="yellow" clickFunction={handleClick} />
              </motion.section>
            ) : null}

            {step === 2 ? (
              <motion.section
                key="step2"
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: 'spring', stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                className="register__section register__section--pink"
              >
                <RegistrationForm color="green" />
              </motion.section>
            ) : null}
          </AnimatePresence>
        )}
      </div>
    </motion.main>
  );
};

export default Register;
