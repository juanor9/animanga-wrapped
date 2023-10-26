/* eslint-disable no-unused-vars */
import { createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = process.env.NEXT_PUBLIC_REACT_APP_BASE_URL;

const createUser = createAsyncThunk(
  'users/createUser',
  async (data) => {
    console.log('🚀 ~ file: registration.js:9 ~ data:', data);
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    const res = await fetch(`${BASE_URL}/api/user`, options);
    const result = await res.json();
    return result;
  },
);

export default createUser;
