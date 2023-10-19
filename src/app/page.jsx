import styles from './page.module.css';
import { SetVerifier } from './features/mal/services/getUrlParams';
import SetCodes from './features/mal/services/setCodes';
import UserRegistration from './features/user/components/UserRegistration';

const MALClientId = process.env.MAL_CLIENT_ID;
const ALClientId = process.env.AL_ID;
const Home = () => {
  const { MALCodeChallenge, MALCodeVerifier } = SetCodes();

  return (
    <main className={styles.main}>
      <SetVerifier challenge={MALCodeChallenge} verifier={MALCodeVerifier} />
      <a
        href={`https://anilist.co/api/v2/oauth/authorize?client_id=${ALClientId}&response_type=token`}
      >
        Login with AniList
      </a>
      <a
        href={`https://myanimelist.net/v1/oauth2/authorize?response_type=code&client_id=${MALClientId}&code_challenge=${MALCodeChallenge}&state=tnk&redirect_uri=https://localhost:3000/user-mal`}
      >
        Login with MyAnimeList
      </a>
      <UserRegistration />
    </main>
  );
};

export default Home;
