/* eslint-disable no-unused-vars */
// import { SetVerifier } from './features/mal/services/getUrlParams';
// import AuthButtons from './features/Home/AuthButtons/AuthButtons';
// import UserRegistration from './features/user/components/UserRegistration/UserRegistration';

import './app.scss';
import Hero from './features/Home/Hero/Hero';
import PopularSlider from './features/Home/PopularSlider/PopularSlider';
import SetCodes from './features/mal/services/setCodes';

const MALClientId = process.env.MAL_CLIENT_ID;
const ALClientId = process.env.AL_ID;
const Home = () => {
  const { MALCodeChallenge, MALCodeVerifier } = SetCodes();

  return (
    <main className="home">
      <Hero className="home__hero" />
      <PopularSlider />
      {/* <SetVerifier challenge={MALCodeChallenge} verifier={MALCodeVerifier} />
      <AuthButtons
        ALClientId={String(ALClientId)}
        MALClientId={String(MALClientId)}
        MALCodeChallenge={String(MALCodeChallenge)}
      /> */}
    </main>
  );
};

export default Home;
