import styles from "./page.module.css";
import crypto from "crypto";
import { setCodeVerifier } from "@/redux/features/MAL";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

export default async function Home() {
  const ALClientId = process.env.AL_ID;

  // const { malCodeVerifier } = useAppSelector((state) => state.MALReducer);
  const dispatch = useAppDispatch();

  const MALCodeVerifier = crypto
    .randomBytes(32)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

  // Calcula el code_challenge
  const MALCodeChallenge = crypto
    .createHash("sha256")
    .update(MALCodeVerifier)
    .digest("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

  if (MALCodeVerifier) {
    console.log('inside if')
    try {
      dispatch(setCodeVerifier(MALCodeVerifier));
      MALCodeVerifier;
    } catch (error) {
      throw new Error(error);
    }
  }

  const MALClientId = process.env.MAL_CLIENT_ID;

  return (
    <main className={styles.main}>
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
