/* eslint-disable camelcase */

'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMalData } from '../../../redux/features/MAL';
import { fetchAuthToken, fetchUser } from '../services/mal';

const ClientDisplay = ({ children, envVar }) => {
  const dispatch = useDispatch();
  const { malData } = useSelector((state) => state.MALReducer);
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
  const [authData, setAuthData] = useState(null);

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

  const [accessToken, setAccessToken] = useState(null);
  useEffect(() => {
    if (authData) {
      const { access_token } = authData;
      setAccessToken(access_token);
    }
  }, [authData]);

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (accessToken) {
      const fetchUserData = async () => {
        const url = '/api/v2/users/@me';
        const callUserData = await fetchUser(accessToken, url);
        return callUserData;
      };

      (async () => {
        try {
          const $userData = await fetchUserData();
          setUserData($userData);
        } catch (error) {
          throw new Error(error);
        }
      })();
    }
  }, [accessToken]);

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
