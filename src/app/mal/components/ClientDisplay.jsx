"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMalData } from "@/redux/features/MAL";
import fetchAuthToken from "../services/mal";

const ClientDisplay = ({ children, envVar }) => {
  const dispatch = useDispatch();
  const { malData } = useSelector((state) => state.MALReducer);
  // console.log("🚀 ~ file: ClientDisplay.jsx:10 ~ ClientDisplay ~ malData:", malData)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const uri = window.location.href;
      const url = new URL(uri);
      const codeFromUrl = url.searchParams.get("code");

      const verifier = window.localStorage.getItem('challenge')

      dispatch(
        setMalData({
          ...malData,
          code: codeFromUrl,
          MALClientId: envVar.MALClientId,
          MALClientSecret: envVar.MALClientSecret,
          verifier,
        })
      );
    }
  }, []);

  useEffect(() => {
    const malDataKeys = Object.keys(malData);
    if (malDataKeys.length > 0) {
      const fetchData = async () => {
        const url = '/api/v1/oauth2/token';
        try {
          const data = await fetchAuthToken(malData, url);
          console.log("🚀 ~ file: ClientDisplay.jsx:59 ~ useEffect ~ data:", data);
        } catch (error) {
          console.error('Error al obtener el token de autorización:', error);
        }
      };
      fetchData();
    }
  }, [malData]);

  return (
    <>
      <div>{children}</div>
    </>
  );
};
export default ClientDisplay;
