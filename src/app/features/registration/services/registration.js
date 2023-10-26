/* eslint-disable no-unused-vars */
import { createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const createuser = createAsyncThunk(
  'users/createUser',
  async (data) => {
    const { form } = data;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    };

    const res = await fetch(`${BASE_URL}/api/libraries`, options);
    const result = await res.json();
    return result;
  },
);

export default createuser;
