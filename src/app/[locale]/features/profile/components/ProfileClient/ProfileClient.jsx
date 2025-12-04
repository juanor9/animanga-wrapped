'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../../../../components/Spinner/Spinner';
import { logout } from '../../../../../../redux/features/user';
import './ProfileClient.scss';

const ProfileClient = () => {
  const t = useTranslations('profile');
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, accessToken } = useSelector((state) => state.user);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [history, setHistory] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    country: '',
    anilistUsername: '',
  });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showSuspendConfirm, setShowSuspendConfirm] = useState(false);
  const [suspendReason, setSuspendReason] = useState('');

  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/user/profile', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch profile');
      }

      const data = await response.json();
      setProfileData(data.user);
      setFormData({
        email: data.user.email,
        country: data.user.country,
        anilistUsername: data.user.anilistUsername,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [accessToken]);

  const fetchHistory = useCallback(async () => {
    try {
      const response = await fetch('/api/user/history', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch history');
      }

      const data = await response.json();
      setHistory(data.history);
    } catch (err) {
      console.error('Error fetching history:', err);
    }
  }, [accessToken]);

  useEffect(() => {
    if (!accessToken) {
      router.push('/');
      return;
    }

    fetchProfile();
    fetchHistory();
  }, [accessToken, fetchProfile, fetchHistory, router]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const data = await response.json();
      setProfileData(data.user);
      setEditMode(false);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSuspendAccount = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/user/suspend', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ reason: suspendReason }),
      });

      if (!response.ok) {
        throw new Error('Failed to suspend account');
      }

      dispatch(logout());
      router.push('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setShowSuspendConfirm(false);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/user/account', {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete account');
      }

      dispatch(logout());
      router.push('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setShowDeleteConfirm(false);
    }
  };

  if (loading && !profileData) {
    return (
      <div className="profile__loading">
        <Spinner />
      </div>
    );
  }

  if (error && !profileData) {
    return (
      <div className="profile__error">
        <h2>{t('errorTitle')}</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="profile">
      <div className="profile__container">
        <section className="profile__section">
          <h1 className="profile__title">{t('title')}</h1>

          {/* Profile Information */}
          <div className="profile__info">
            <div className="profile__avatar">
              {profileData?.anilistAvatar ? (
                <img src={profileData.anilistAvatar} alt={t('avatarAlt')} />
              ) : (
                <div className="profile__avatar-placeholder">
                  {profileData?.anilistUsername?.[0]?.toUpperCase()}
                </div>
              )}
            </div>

            {editMode ? (
              <form className="profile__form" onSubmit={handleUpdateProfile}>
                <div className="profile__form-group">
                  <label htmlFor="anilistUsername">{t('anilistUsername')}</label>
                  <input
                    id="anilistUsername"
                    type="text"
                    value={formData.anilistUsername}
                    onChange={(e) => setFormData({ ...formData, anilistUsername: e.target.value })}
                  />
                </div>

                <div className="profile__form-group">
                  <label htmlFor="email">{t('email')}</label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="profile__form-group">
                  <label htmlFor="country">{t('country')}</label>
                  <input
                    id="country"
                    type="text"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  />
                </div>

                <div className="profile__form-actions">
                  <button type="submit" className="profile__button profile__button--primary">
                    {t('saveChanges')}
                  </button>
                  <button
                    type="button"
                    className="profile__button profile__button--secondary"
                    onClick={() => setEditMode(false)}
                  >
                    {t('cancel')}
                  </button>
                </div>
              </form>
            ) : (
              <div className="profile__details">
                <h2 className="profile__username">{profileData?.anilistUsername}</h2>
                <p className="profile__field">
                  <strong>{t('email')}:</strong> {profileData?.email}
                </p>
                <p className="profile__field">
                  <strong>{t('country')}:</strong> {profileData?.country}
                </p>
                <p className="profile__field">
                  <strong>{t('memberSince')}:</strong>{' '}
                  {new Date(profileData?.createdAt).toLocaleDateString()}
                </p>
                <p className="profile__field">
                  <strong>{t('emailVerified')}:</strong>{' '}
                  {profileData?.emailVerified ? t('yes') : t('no')}
                </p>

                <button
                  type="button"
                  className="profile__button profile__button--primary"
                  onClick={() => setEditMode(true)}
                >
                  {t('editProfile')}
                </button>
              </div>
            )}
          </div>
        </section>

        {/* History Section */}
        <section className="profile__section">
          <h2 className="profile__section-title">{t('historyTitle')}</h2>

          {history.length === 0 ? (
            <p className="profile__no-history">{t('noHistory')}</p>
          ) : (
            <div className="profile__history">
              {history.map((yearData) => (
                <div key={yearData.year} className="profile__year-card">
                  <h3 className="profile__year-title">{yearData.year}</h3>

                  {yearData.anime.length > 0 && (
                    <div className="profile__year-section">
                      <h4 className="profile__category-title">{t('anime')}</h4>
                      <p className="profile__count">
                        {t('animeCount', { count: yearData.anime.length })}
                      </p>
                    </div>
                  )}

                  {yearData.manga.length > 0 && (
                    <div className="profile__year-section">
                      <h4 className="profile__category-title">{t('manga')}</h4>
                      <p className="profile__count">
                        {t('mangaCount', { count: yearData.manga.length })}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Account Management Section */}
        <section className="profile__section profile__section--danger">
          <h2 className="profile__section-title">{t('accountManagement')}</h2>

          <div className="profile__danger-zone">
            <div className="profile__danger-action">
              <div>
                <h3 className="profile__danger-title">{t('suspendAccount')}</h3>
                <p className="profile__danger-description">{t('suspendDescription')}</p>
              </div>
              <button
                type="button"
                className="profile__button profile__button--warning"
                onClick={() => setShowSuspendConfirm(true)}
              >
                {t('suspendButton')}
              </button>
            </div>

            <div className="profile__danger-action">
              <div>
                <h3 className="profile__danger-title">{t('deleteAccount')}</h3>
                <p className="profile__danger-description">{t('deleteDescription')}</p>
              </div>
              <button
                type="button"
                className="profile__button profile__button--danger"
                onClick={() => setShowDeleteConfirm(true)}
              >
                {t('deleteButton')}
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Suspend Confirmation Modal */}
      {showSuspendConfirm && (
        <div className="profile__modal">
          <div className="profile__modal-content">
            <h3 className="profile__modal-title">{t('suspendConfirmTitle')}</h3>
            <p className="profile__modal-description">{t('suspendConfirmDescription')}</p>

            <div className="profile__form-group">
              <label htmlFor="suspendReason">{t('suspendReason')}</label>
              <textarea
                id="suspendReason"
                value={suspendReason}
                onChange={(e) => setSuspendReason(e.target.value)}
                placeholder={t('suspendReasonPlaceholder')}
              />
            </div>

            <div className="profile__modal-actions">
              <button
                type="button"
                className="profile__button profile__button--warning"
                onClick={handleSuspendAccount}
              >
                {t('confirmSuspend')}
              </button>
              <button
                type="button"
                className="profile__button profile__button--secondary"
                onClick={() => setShowSuspendConfirm(false)}
              >
                {t('cancel')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="profile__modal">
          <div className="profile__modal-content">
            <h3 className="profile__modal-title">{t('deleteConfirmTitle')}</h3>
            <p className="profile__modal-description">{t('deleteConfirmDescription')}</p>

            <div className="profile__modal-actions">
              <button
                type="button"
                className="profile__button profile__button--danger"
                onClick={handleDeleteAccount}
              >
                {t('confirmDelete')}
              </button>
              <button
                type="button"
                className="profile__button profile__button--secondary"
                onClick={() => setShowDeleteConfirm(false)}
              >
                {t('cancel')}
              </button>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="profile__toast">
          <p>{error}</p>
          <button type="button" onClick={() => setError(null)}>
            ×
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileClient;
