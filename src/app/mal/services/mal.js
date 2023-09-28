const fetchAuthToken = async ({MALClientId, MALClientSecret, code, code_verifier}, url) => {
  console.log("Sending request to:", url);
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: MALClientId,
      client_secret: MALClientSecret,
      code: code,
      code_verifier: code_verifier,
      grant_type: "authorization_code",
      redirect_uri: "https://localhost:3000/user-mal",
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch auth token: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
};
 export default fetchAuthToken;
