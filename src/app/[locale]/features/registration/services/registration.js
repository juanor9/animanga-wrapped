import { createAsyncThunk } from '@reduxjs/toolkit';
import { newUser, setTokens } from '../../../../../redux/features/user';

const createUser = createAsyncThunk(
  'users/createUser',

  async (userData, thunkAPI) => {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      };

      const res = await fetch('/api/users', options);
      const result = await res.json();

      if (!res.ok) {
        return thunkAPI.rejectWithValue(result);
      }

      if (result.accessToken && result.refreshToken && result.user) {
        thunkAPI.dispatch(
          setTokens({
            accessToken: result.accessToken,
            refreshToken: result.refreshToken,
          })
        );
        thunkAPI.dispatch(newUser(result.user));
      }

      return { user: result.user };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export default createUser;
