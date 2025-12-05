import { createAsyncThunk } from '@reduxjs/toolkit';
import { logout, newUser, setTokens } from '../../../../../redux/features/user';

const BASE_URL = process.env.NEXT_PUBLIC_REACT_APP_BASE_URL || 'http://localhost:3000';

export const createUser = createAsyncThunk('users/createUser', async (user, thunkAPI) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  };

  // Assuming the backend returns tokens and user data upon registration
  const res = await fetch(`${BASE_URL}/api/users`, options);
  const result = await res.json();

  if (res.ok && result.accessToken) {
    thunkAPI.dispatch(
      setTokens({
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
      })
    );
    thunkAPI.dispatch(newUser(result.user));
  }

  return result;
});

export const sendMagicLink = createAsyncThunk('users/sendMagicLink', async (email, thunkAPI) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: email.toLowerCase() }),
  };

  const res = await fetch(`${BASE_URL}/api/auth/magic-link/send`, options);
  const result = await res.json();

  if (!res.ok) {
    return thunkAPI.rejectWithValue(result);
  }

  return { ...result, email: email.toLowerCase() };
});

export const verifyMagicLink = createAsyncThunk(
  'users/verifyMagicLink',
  async (token, thunkAPI) => {
    const res = await fetch(`${BASE_URL}/api/auth/magic-link/verify?token=${token}`);
    const result = await res.json();

    if (res.ok) {
      // Dispatch actions to store tokens and user data in Redux state
      thunkAPI.dispatch(
        setTokens({
          accessToken: result.accessToken,
          refreshToken: result.refreshToken,
        })
      );
      thunkAPI.dispatch(newUser(result.user));
      return result;
    }

    // Let the reducer handle the error case
    return thunkAPI.rejectWithValue(result);
  }
);

export const logoutUser = createAsyncThunk('users/logout', async (_, thunkAPI) => {
  const {
    user: { refreshToken },
  } = thunkAPI.getState();
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    // Backend might need the refresh token to invalidate it
    body: JSON.stringify({ refreshToken }),
  };

  // We call the logout endpoint, but we will clear the client state regardless of the response
  await fetch(`${BASE_URL}/auth/local/logout`, options);

  // Dispatch the local logout action to clear the state
  thunkAPI.dispatch(logout());

  return null;
});
