import './AuthButtons.scss';

const AuthButtons = ({ ALClientId, MALClientId, MALCodeChallenge }) => (
  <div className="auth-buttons">
    <a
      className="auth-buttons__link"
      href={`https://anilist.co/api/v2/oauth/authorize?client_id=${ALClientId}&response_type=token`}
    >
      Login with AniList
    </a>
    <a
      className="auth-buttons__link"
      href={`https://myanimelist.net/v1/oauth2/authorize?response_type=code&client_id=${MALClientId}&code_challenge=${MALCodeChallenge}&state=tnk&redirect_uri=https://localhost:3000/user-mal`}
    >
      Login with MyAnimeList
    </a>
  </div>
);

export default AuthButtons;
