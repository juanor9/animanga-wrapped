import { createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = process.env.REACT_APP_BASE_URL || 'https://localhost:3000';

const createUser = createAsyncThunk(
  'users/createUser',
  async (user) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    };

    const res = await fetch(`${BASE_URL}/api/users`, options);
    const result = await res.json();
    return result;
  },
);
export default createUser;
