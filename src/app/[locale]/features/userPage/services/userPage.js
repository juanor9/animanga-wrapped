import { createAsyncThunk } from '@reduxjs/toolkit';
import authFetch from '../../../../lib/authFetch';

const BASE_URL = process.env.NEXT_PUBLIC_REACT_APP_BASE_URL;

export const getUserProfile = createAsyncThunk('users/getUser', async (_, thunkAPI) => {
  try {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await authFetch(`${BASE_URL}/api/user`, options);
    const result = await res.json();

    if (!res.ok) {
      return thunkAPI.rejectWithValue(result);
    }
    return result;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const getUserData = createAsyncThunk('users/getUserData', async (userId, thunkAPI) => {
  try {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await authFetch(`${BASE_URL}/api/user/${userId}`, options);
    const result = await res.json();

    if (!res.ok) {
      return thunkAPI.rejectWithValue(result);
    }
    return result;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
