'use client';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { newUser } from '../../../../../../redux/features/user';
import { getViewer } from '../../../../../lib/anilist';
import ALAnimeList from '../AnimeList/AnimeList';
import ALMangaList from '../MangaList/MangaList';
import './UserAL.scss';

const UserAL = ({ settings, checkFunc }) => {
  // Estados
  const [viewerData, setViewerData] = useState(null);
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState(null);

  const { user } = useSelector((state) => state.UserReducer);

  const dispatch = useDispatch();

  // Get access token from Redux (already stored by RegisterClient)
  const accessToken = user?.anilistAccessToken;

  // If we already have user data from Redux, use it
  useEffect(() => {
    if (user?.anilistId && user?.anilistUsername) {
      setUserId(user.anilistId);
      setUsername(user.anilistUsername);
      // Create a viewer data object from Redux data
      setViewerData({
        Viewer: {
          id: user.anilistId,
          name: user.anilistUsername,
          avatar: user.anilistAvatar,
        },
      });
    }
  }, [user]);

  // Fallback: Efecto para obtener los datos del espectador si no están en Redux
  useEffect(() => {
    const fetchViewerData = async () => {
      try {
        const viewer = await getViewer(accessToken);
        setViewerData(viewer);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error fetching viewer data:', error);
      }
    };

    // Only fetch if we don't have data in Redux but have a token
    if (accessToken && !user?.anilistId) {
      fetchViewerData();
    }
  }, [accessToken, user]);

  // Efecto para establecer el ID y nombre del usuario
  useEffect(() => {
    if (viewerData && !userId) {
      const { Viewer } = viewerData;
      setUserId(Viewer.id);
      setUsername(Viewer.name);
    }
  }, [viewerData, userId]);

  useEffect(() => {
    if (username && user && user.listUsername !== username) {
      dispatch(
        newUser({
          ...user,
          listUsername: username,
        })
      );
    }
  }, [username, dispatch, user]);

  // Componente de retorno
  return (
    <div className="user-al">
      {viewerData?.Viewer?.avatar?.large && (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={viewerData.Viewer.avatar.large} alt="User avatar" className="user-al__avatar" />
        </>
      )}
      <p className="user-al__name">Username: {username}</p>
      <div className="user-al__stats">{/* Add any future stats here */}</div>
      {settings.anime && settings.anime === true ? (
        <ALAnimeList userId={userId} checkFunc={checkFunc} />
      ) : null}
      {settings.manga && settings.manga === true ? (
        <ALMangaList userId={userId} checkFunc={checkFunc} />
      ) : null}
    </div>
  );
};

export default UserAL;
