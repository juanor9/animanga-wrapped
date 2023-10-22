/* eslint-disable no-unused-vars */
const AnilistAuth = ({ color }) => {
  const ALClientId = process.env.AL_ID;
  return (
    <div>
      <p>
        Almost there! Link up with your Anilist account and let&apos;s get the party started.
      </p>
      <a
        className={`register__button register__button--${color}`}
        href={`https://anilist.co/api/v2/oauth/authorize?client_id=${ALClientId}&response_type=token`}
      >
        Sync with AniList
      </a>
    </div>
  );
};

export default AnilistAuth;
