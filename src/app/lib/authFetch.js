
import { store } from '../../redux/store';
import { setAccessToken, logout } from '../../redux/features/user';

const BASE_URL = process.env.NEXT_PUBLIC_REACT_APP_BASE_URL || 'https://localhost:3000';

const refreshAccessToken = async () => {
  const { user: { refreshToken } } = store.getState();

  if (!refreshToken) {
    store.dispatch(logout());
    throw new Error('Session expired. No refresh token found.');
  }

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refreshToken }),
  };

  const response = await fetch(`${BASE_URL}/auth/local/refresh`, options);
  const data = await response.json();

  if (!response.ok) {
    store.dispatch(logout());
    throw new Error(data.message || 'Failed to refresh access token.');
  }

  store.dispatch(setAccessToken(data.accessToken));
  return data.accessToken;
};

const authFetch = async (url, options = {}) => {
  let { user: { accessToken } } = store.getState();

  // Create initial headers if they don't exist
  if (!options.headers) {
    options.headers = {};
  }

  // Add authorization header if token exists
  if (accessToken) {
    options.headers.Authorization = `Bearer ${accessToken}`;
  }

  // Make the initial request
  let response = await fetch(url, options);

  // If the request fails with 401 Unauthorized, try to refresh the token
  if (response.status === 401) {
    try {
      const newAccessToken = await refreshAccessToken();
      
      // Update the authorization header with the new token
      options.headers.Authorization = `Bearer ${newAccessToken}`;

      // Retry the request with the new token
      response = await fetch(url, options);

    } catch (error) {
      // If refreshing the token fails, the user is logged out
      // and we throw an error to stop the application flow.
      console.error('Session refresh failed:', error);
      // Redirect to login page could be handled here or in the UI component that catches the error
      window.location.href = '/login'; // Forcing a redirect as the session is invalid
      throw error;
    }
  }

  return response;
};

export default authFetch;
