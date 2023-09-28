"use client";

import styles from "./page.module.css";
import crypto from "crypto";
import { SetVerifier } from "./mal/services/getUrlParams";

const MALClientId = process.env.MAL_CLIENT_ID;
const ALClientId = process.env.AL_ID;

export default function Home() {

  const MALCodeVerifier = crypto
    .randomBytes(32)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

  // // Calcula el code_challenge
  const MALCodeChallenge = crypto
    .createHash("sha256")
    .update(MALCodeVerifier)
    .digest("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");



  return (
    <main className={styles.main}>
      <SetVerifier verifier={MALCodeVerifier} challenge = {MALCodeChallenge} />
      <a
        href={`https://anilist.co/api/v2/oauth/authorize?client_id=${ALClientId}&response_type=token`}
      >
        Login with AniList
      </a>
      <a
        href={`https://myanimelist.net/v1/oauth2/authorize?response_type=code&client_id=${MALClientId}&code_challenge=${MALCodeChallenge}`}
      >
        Login with MyAnimeList
      </a>
    </main>
  );
}
