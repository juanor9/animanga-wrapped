import { createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = process.env.NEXT_PUBLIC_REACT_APP_BASE_URL || 'https://localhost:3000';

export const createUser = createAsyncThunk(
  'users/createUser',
  async (user, { rejectWithValue }) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    };

    const res = await fetch(`${BASE_URL}/api/users`, options);
    const result = await res.json();

    if (!res.ok) {
      return rejectWithValue(result);
    }

    return result;
  },
);

export const login = createAsyncThunk(
  'users/login',
  async (form, { rejectWithValue }) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    };

    const res = await fetch(`${BASE_URL}/auth/local/login`, options);
    const result = await res.json();

    if (!res.ok) {
      return rejectWithValue(result);
    }

    if (window !== undefined) {
      window.localStorage.setItem('userToken', result.userToken);
    }

    return result;
  },
);
