import { createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = process.env.NEXT_PUBLIC_REACT_APP_BASE_URL;

export const getUserProfile = createAsyncThunk(
  'users/getUser',
  async (userToken) => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      },
    };

    const res = await fetch(`${BASE_URL}/api/user`, options);
    const result = await res.json();
    return result;
  },
);

export const getUserData = createAsyncThunk(
  'users/getUserData',
  async (data) => {
    const { userId, userToken } = data;
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      },
    };

    const res = await fetch(`${BASE_URL}/api/user/${userId}`, options);
    const result = await res.json();
    return result;
  },
);
