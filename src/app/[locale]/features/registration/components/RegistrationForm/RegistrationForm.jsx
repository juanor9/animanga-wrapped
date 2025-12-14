'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { newUser } from '../../../../../../redux/features/user';
import { COUNTRIES } from '../../../../../lib/constants/countries';
import Spinner from '../../../../components/Spinner/Spinner';
import UserAL from '../../../anilist/components/UserAL/UserAL';
import createUser from '../../services/registration';
import './RegistrationForm.scss';

const ALClientId = process.env.NEXT_PUBLIC_AL_ID;
const anilistUrl = `https://anilist.co/api/v2/oauth/authorize?client_id=${ALClientId}&response_type=token`;

const RegistrationForm = ({ color }) => {
  const t = useTranslations('registration.registrationForm');
  // const tCommon = useTranslations('common');
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.UserReducer);

  const [anilistConnected, setAnilistConnected] = useState(false);
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [selectedLists, setSelectedLists] = useState({
    anime: false,
    manga: false,
  });
  const [isListValid, setIsListValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  // Check if user has AniList data (coming back from OAuth)
  useEffect(() => {
    if (user?.anilistId) {
      setAnilistConnected(true);
    }
  }, [user]);

  const handleAnilistClick = () => {
    if (window !== undefined) {
      window.localStorage.setItem('registrationStep', '2');
      window.location.href = anilistUrl;
    }
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setSelectedLists((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError('');
  };

  const handleCountryChange = (e) => {
    setCountry(e.target.value);
  };

  const isFormValid =
    anilistConnected && email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && country && isListValid;

  const handleSubmit = async (event) => {
    // Safety first: prevent default immediately
    if (event && event.preventDefault) event.preventDefault();
    if (event && event.stopPropagation) event.stopPropagation();

    if (!isFormValid) return;

    setIsLoading(true);
    setError('');

    try {
      // Prepare user data for registration
      // IMPORTANT: user.lists already contains the complete AniList activities
      // populated by ALAnimeList and ALMangaList components

      // Filter lists to only include what the user selected
      let filteredLists = [];
      if (user.lists && Array.isArray(user.lists)) {
        filteredLists = user.lists.map((yearList) => {
          const filtered = { year: yearList.year };

          // Only include animeList if user selected anime
          if (selectedLists.anime && yearList.animeList) {
            filtered.animeList = yearList.animeList;
          }

          // Only include mangaList if user selected manga
          if (selectedLists.manga && yearList.mangaList) {
            filtered.mangaList = yearList.mangaList;
          }

          return filtered;
        });
      }

      // Fallback: recover consent data from localStorage if missing in Redux (e.g. after refresh)
      let { isAdult, termsAccepted, privacyAccepted } = user;

      if (typeof window !== 'undefined' && (!isAdult || !termsAccepted || !privacyAccepted)) {
        try {
          const savedConsent = window.localStorage.getItem('consentData');
          if (savedConsent) {
            const parsed = JSON.parse(savedConsent);
            if (parsed) {
              if (parsed.isAdult) isAdult = parsed.isAdult;
              if (parsed.termsAccepted) termsAccepted = parsed.termsAccepted;
              if (parsed.privacyAccepted) privacyAccepted = parsed.privacyAccepted;
            }
          }
        } catch (e) {
          console.error('Error recovering consent data from localStorage:', e);
        }
      }

      const userData = {
        ...user,
        email: email.toLowerCase(),
        country,
        lists: filteredLists,
        isAdult,
        termsAccepted,
        privacyAccepted,
      };

      // DEBUG: Inspect payload before sending
      console.log('🐞 DEBUG - Final userData being sent to API:', userData);
      console.log('🐞 DEBUG - Redux user state:', user);
      if (typeof window !== 'undefined') {
        console.log(
          '🐞 DEBUG - localStorage consentData:',
          window.localStorage.getItem('consentData')
        );
      }

      // REMOVED: Do not update Redux state before success to avoid side effects
      // dispatch(newUser(userData));

      // Create user in backend
      const result = await dispatch(createUser(userData));

      if (createUser.rejected.match(result)) {
        console.error('❌ API Request Failed:', result);

        // Extract error message safely and ensure it's a string
        const payload = result.payload || {};
        let errorMessage =
          payload.error || payload.message || result.error?.message || t('errorGeneric');

        if (typeof errorMessage === 'object') {
          errorMessage = JSON.stringify(errorMessage);
        }

        setError(String(errorMessage));
        setIsLoading(false);
        return;
      }

      // Clear consent data from localStorage after successful registration
      if (typeof window !== 'undefined') {
        // window.localStorage.removeItem('consentData');
        // Keep it for now until we are sure it works
      }

      // Redirect to user dashboard on success
      router.push('./user');
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Registration error:', err);
      setError(t('errorGeneric'));
      setIsLoading(false);
    }
  };

  return (
    <div className="registration-form">
      {/* Decorative diagonal stripes - ONLY YELLOW */}
      <div className="registration-form__decorative-stripes">
        <svg
          width="300"
          height="300"
          viewBox="0 0 300 300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Yellow stripes only - positioned away from text */}
          <rect
            x="0"
            y="0"
            width="50"
            height="600"
            fill="#f1c40f"
            transform="rotate(-45 150 150)"
          />
          <rect
            x="70"
            y="0"
            width="50"
            height="600"
            fill="#f1c40f"
            transform="rotate(-45 150 150)"
          />
        </svg>
      </div>

      {!anilistConnected ? (
        <div className="registration-form__anilist">
          <h2>{t('title')}</h2>
          <p className="registration-form__description">{t('description')}</p>
          <button
            type="button"
            className={`register__button register__button--${color}`}
            onClick={handleAnilistClick}
          >
            {t('anilistButton')}
          </button>
        </div>
      ) : (
        <div className="registration-form__form">
          <h2>{t('titleForm')}</h2>
          <p className="registration-form__description">{t('descriptionForm')}</p>

          {/* List Selection */}
          <div className="registration-form__lists">
            <p className="registration-form__lists-label">{t('listsLabel')}</p>
            <div className="registration-form__lists-checkboxes">
              <label htmlFor="anime" className="registration-form__checkbox-label">
                <input
                  type="checkbox"
                  name="anime"
                  id="anime"
                  onChange={handleCheckboxChange}
                  checked={selectedLists.anime}
                />
                <span>{t('animeList')}</span>
              </label>
              <label htmlFor="manga" className="registration-form__checkbox-label">
                <input
                  type="checkbox"
                  name="manga"
                  id="manga"
                  onChange={handleCheckboxChange}
                  checked={selectedLists.manga}
                />
                <span>{t('mangaList')}</span>
              </label>
            </div>
            <UserAL settings={selectedLists} checkFunc={setIsListValid} />
          </div>

          {/* Email Field */}
          <div className="registration-form__field">
            <label htmlFor="email">{t('emailLabel')}</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder={t('emailPlaceholder')}
              className="registration-form__input"
              required
            />
            <p className="registration-form__help">{t('emailHelp')}</p>
          </div>

          {/* Country Select */}
          <div className="registration-form__field">
            <label htmlFor="country">{t('countryLabel')}</label>
            <select
              id="country"
              value={country}
              onChange={handleCountryChange}
              className="registration-form__select"
              required
            >
              <option value="">{t('countryPlaceholder')}</option>
              {COUNTRIES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Error Message */}
          {error && <p className="registration-form__error">{error}</p>}

          {/* Submit Button */}
          <button
            type="button"
            onClick={handleSubmit}
            className={`register__button register__button--${color} ${!isFormValid || isLoading ? 'register__button--disabled' : ''}`}
            disabled={!isFormValid || isLoading}
          >
            {isLoading ? <Spinner className="register__button-spinner" /> : t('submitButton')}
          </button>
        </div>
      )}
    </div>
  );
};

export default RegistrationForm;
