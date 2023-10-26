/* eslint-disable no-unused-vars */

'use client';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getViewer } from '../../services/anilist';
import { newUser } from '../../../../../redux/features/user';
import ALAnimeList from '../AnimeList/AnimeList';
import ALMangaList from '../MangaList/MangaList';
import './UserAL.scss';

const UserAL = ({ settings }) => {
  // Estados
  const [accessToken, setAccessToken] = useState('');
  const [viewerData, setViewerData] = useState(null);
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState(null);

  const { user } = useSelector((state) => state.UserReducer);

  const dispatch = useDispatch();

  // Efecto para obtener el token de acceso
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hashFragment = window.location.hash;
      const params = new URLSearchParams(hashFragment.substring(1));
      const newAccessToken = params.get('access_token');
      setAccessToken(newAccessToken);
    }
  }, []);

  // Efecto para obtener los datos del espectador
  useEffect(() => {
    const fetchViewerData = async () => {
      try {
        const viewer = await getViewer(accessToken);
        setViewerData(viewer);
      } catch (error) {
        throw new Error('Error fetching viewer data:', error);
      }
    };

    if (accessToken) {
      fetchViewerData();
    }
  }, [accessToken]);

  // Efecto para establecer el ID y nombre del usuario
  useEffect(() => {
    if (viewerData) {
      const { Viewer } = viewerData;
      setUserId(Viewer.id);
      setUsername(Viewer.name);
    }
  }, [viewerData]);

  useEffect(() => {
    if (username) {
      dispatch(
        newUser({
          ...user,
          listUsername: username,
        }),
      );
    }
  }, [username]);

  // Componente de retorno
  return (
    <div className="user-al">
      <p>Username: {username}</p>
      {settings.anime && settings.anime === true ? (
        <ALAnimeList userId={userId} />
      ) : null}
      {settings.manga && settings.manga === true ? (
        <ALMangaList userId={userId} />
      ) : null}
    </div>
  );
};

export default UserAL;
