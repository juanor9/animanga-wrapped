import { useEffect } from 'react';

const ALClientId = process.env.NEXT_PUBLIC_AL_ID;
const anilistUrl = `https://anilist.co/api/v2/oauth/authorize?client_id=${ALClientId}&response_type=token`;

const AnilistAuth = ({ color, step }) => {
  const handleClick = () => {
    if (window !== undefined) {
      window.location.href = anilistUrl;
    }
  };

  useEffect(() => {
    if (window !== undefined) {
      window.localStorage.setItem('step', step + 1);
    }
  }, [step]);

  return (
    <div>
      <p>
        Almost there! Link up with your Anilist account and let&apos;s get the party started.
      </p>
      <a
        className={`register__button register__button--${color}`}
        href={anilistUrl}
        onClick={handleClick}
      >
        Sync with AniList
      </a>
    </div>
  );
};

export default AnilistAuth;
