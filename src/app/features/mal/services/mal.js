/* eslint-disable camelcase */
export async function fetchAuthToken(
  {
    MALClientId, MALClientSecret, code, code_verifier,
  },
  url,
) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: MALClientId,
      client_secret: MALClientSecret,
      code,
      code_verifier,
      grant_type: 'authorization_code',
      redirect_uri: 'https://localhost:3000/user-mal',
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch auth token: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
}

export async function fetchUser(accessToken, url) {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch auth token: ${response.statusText}`);
  }

  const data = await response.json();
  const results = await data;
  return results;
}

export async function fetchAnimeList(accessToken, url) {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch anime list: ${response.statusText}`);
  }

  const data = await response.json();
  const results = await data;
  return results;
}

export async function fetchMangaList(accessToken, url) {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch manga list: ${response.statusText}`);
  }

  const data = await response.json();
  const results = await data;
  return results;
}
