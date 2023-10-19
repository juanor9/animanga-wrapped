'use client';

import React, { useEffect, useState } from 'react';
import { getViewer } from '../features/anilist/services/anilist';
import ALAnimeList from '../features/anilist/components/AnimeList/AnimeList';
import ALMangaList from '../features/anilist/components/MangaList/MangaList';

const User = () => {
  // Estados
  const [accessToken, setAccessToken] = useState('');
  const [viewerData, setViewerData] = useState(null);
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState(null);

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

  // Componente de retorno
  return (
    <div>
      <h2>User Page</h2>
      <p>UserId: {userId}</p>
      <p>Username: {username}</p>
      <ALAnimeList userId={userId} />
      <ALMangaList userId={userId} />
    </div>
  );
};

export default User;
