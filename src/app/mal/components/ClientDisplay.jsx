"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMalData } from "@/redux/features/MAL";
import fetchAuthToken from "../services/mal";

const ClientDisplay = ({ children, envVar }) => {
  const dispatch = useDispatch();
  const { malData } = useSelector((state) => state.MALReducer);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const uri = window.location.href;
      const url = new URL(uri);
      const codeFromUrl = url.searchParams.get("code");

      const code_verifier = window.localStorage.getItem("code_verifier");

      dispatch(
        setMalData({
          ...malData,
          code: codeFromUrl,
          MALClientId: envVar.MALClientId,
          MALClientSecret: envVar.MALClientSecret,
          code_verifier,
        })
      );
    }
  }, []);
  const [authData, setAuthData] = useState(null);
  console.log(
    "🚀 ~ file: ClientDisplay.jsx:32 ~ ClientDisplay ~ authData:",
    authData
  );
  useEffect(() => {
    const malDataKeys = Object.keys(malData);
    if (malDataKeys.length > 0) {
      const fetchData = async () => {
        const url = "/api/v1/oauth2/token";
        try {
          const data = await fetchAuthToken(malData, url);
          setAuthData(data);
          return data;
        } catch (error) {
          console.error("Error al obtener el token de autorización:", error);
        }
      };
      fetchData();
    }
  }, [malData]);

  const [accessToken, setAccessToken] = useState(null);
  console.log("🚀 ~ file: ClientDisplay.jsx:53 ~ ClientDisplay ~ accessToken:", accessToken)
  useEffect(() => {
    if (authData) {
      const { access_token } = authData;
      setAccessToken(access_token);
    }
  }, [authData]);

  return (
    <>
      <div>{children}</div>
    </>
  );
};
export default ClientDisplay;
