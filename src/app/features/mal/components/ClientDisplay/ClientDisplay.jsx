/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable camelcase */

'use client';

// Importaciones necesarias
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMalData } from '../../../../../redux/features/MAL';
import { fetchAuthToken, fetchUser } from '../../services/mal';

const ClientDisplay = ({ children, envVar }) => {
  const dispatch = useDispatch();
  const { malData } = useSelector((state) => state.MALReducer);

  // Estado local para guardar datos de autenticación y datos del usuario
  const [authData, setAuthData] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [userData, setUserData] = useState(null);

  // Efecto para obtener y configurar datos iniciales de MAL desde la URL
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const uri = window.location.href;
      const url = new URL(uri);
      const codeFromUrl = url.searchParams.get('code');
      const code_verifier = window.localStorage.getItem('code_verifier');

      dispatch(
        setMalData({
          ...malData,
          code: codeFromUrl,
          MALClientId: envVar.MALClientId,
          MALClientSecret: envVar.MALClientSecret,
          code_verifier,
        }),
      );
    }
  }, []);

  // Efecto para obtener el token de autenticación usando datos de MAL
  useEffect(() => {
    const malDataKeys = Object.keys(malData);
    if (malDataKeys.length > 0) {
      const fetchData = async () => {
        const url = '/net/v1/oauth2/token';
        try {
          const data = await fetchAuthToken(malData, url);
          setAuthData(data);
          return data;
        } catch (error) {
          throw new Error('Error al obtener el token de autorización:', error);
        }
      };
      fetchData();
    }
  }, [malData]);

  // Efecto para establecer el token de acceso a partir de los datos de autenticación
  useEffect(() => {
    if (authData) {
      const { access_token } = authData;
      setAccessToken(access_token);
      localStorage.setItem('malToken', access_token);
    }
  }, [authData]);

  // Efecto para obtener y configurar datos del usuario usando el token de acceso
  useEffect(() => {
    if (accessToken) {
      const fetchUserData = async () => {
        const url = '/api/mal/v2/users/@me';
        const callUserData = await fetchUser(accessToken, url);
        return callUserData;
      };

      (async () => {
        try {
          const $userData = await fetchUserData();
          setUserData($userData);
          const malUser = JSON.stringify($userData);
          localStorage.setItem('malUser', malUser);
        } catch (error) {
          throw new Error(error);
        }
      })();
    }
  }, [accessToken]);

  // Renderizado del componente
  return (
    <>
      <div>{children}</div>
      {userData ? (
        <>
          <p>Username: {userData.name}</p>
          <p>ID: {userData.id}</p>
        </>
      ) : null}
    </>
  );
};

export default ClientDisplay;
