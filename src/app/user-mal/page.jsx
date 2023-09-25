"use client";

import React, { useEffect, useState } from "react";

const User = () => {
  // const dispatch = useAppDispatch();
  const [code, setCode] = useState("");
  const MALClientId = process.env.MAL_CLIENT_ID;
  const MALClientSecret = process.env.MAL_CLIENT_SECRET;

  useEffect(() => {
    if (typeof window !== "undefined") {
      const uri = window.location.href;
      const url = new URL(uri);
      const codeFromUrl = url.searchParams.get('code');
      setCode(codeFromUrl);
    }
  }, []);

  useEffect(() => {
    if(code){
      try {
        // dispatch(setCodeAsState(code))
      } catch (error) {
        throw new Error(error)
      }
    }
  }, [code])

  // useEffect(() => {
  //   const fetchAccessToken = async () => {
  //     const response = await fetch("https://myanimelist.net/v1/oauth2/token", {
  //        method: "POST",
  //        headers: {
  //          "Content-Type": "application/x-www-form-urlencoded",
  //        },
  //        body: new URLSearchParams({
  //          client_id: MALClientId,
  //          client_secret: MALClientSecret,
  //          code,
  //          code_verifier: "CODE_VERIFIER",
  //          grant_type: "authorization_code",
  //          redirect_uri: "YOUR_REDIRECT_URI",
  //        }),
  //     });

  //     if (!response.ok) {
  //        throw new Error("Failed to fetch access token");
  //     }

  //     const data = await response.json();
  //     console.log("Access Token:", data.access_token);
  //    };

  //    fetchAccessToken();
  // }, [code])

  return (
    <div>
      <h2>User Page</h2>
      <p>code: {code}</p>
    </div>
  );
};

export default User;
