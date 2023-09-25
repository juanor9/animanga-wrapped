"use client";

import React, { useEffect, useState } from "react";
import { getViewer } from "../anilist/services/anilist";
import Image from "next/image";

const User = () => {
  // Utiliza el estado para almacenar los valores
  const [accessToken, setAccessToken] = useState("");
  const [viewerData, setViewerData] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hashFragment = window.location.hash;

      const params = new URLSearchParams(hashFragment.substring(1));

      const newAccessToken = params.get("access_token");

      setAccessToken(newAccessToken);
    }
  }, []);

  useEffect(() => {
    const fetchViewerData = async () => {
      try {
        const viewer = await getViewer(accessToken);
        setViewerData(viewer);
      } catch (error) {
        console.error("Error fetching viewer data:", error);
      }
    }

    if (accessToken){
      fetchViewerData();
    }
  }, [accessToken]);

  const [userId, setUserId]=useState(null);
  const [username, setUsername]=useState(null);
  const [avatar, setAvatar]=useState(null);
  useEffect(() => {
    if (viewerData){
      const {Viewer} = viewerData;
      console.log("🚀 ~ file: page.jsx:47 ~ useEffect ~ Viewer:", Viewer)

      setUserId(Viewer.id);
      setUsername(Viewer.name);
      setAvatar(Viewer.avatar.large);
    }
  }, [viewerData]);

  

  return (
    <div>
      <h2>User Page</h2>
      <p>UserId: {userId}</p>
      <p>Username: {username}</p>
    </div>
  );
};

export default User;