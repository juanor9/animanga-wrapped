import crypto from 'crypto';

const SetCodes = () => {
  const MALCodeVerifier = crypto
    .randomBytes(32)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
  const MALCodeChallenge = MALCodeVerifier;

  return { MALCodeVerifier, MALCodeChallenge };
};

export default SetCodes;
