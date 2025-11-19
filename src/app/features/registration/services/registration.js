import { createAsyncThunk } from '@reduxjs/toolkit';
import { setTokens, newUser } from '../../../../redux/features/user';

const BASE_URL = process.env.NEXT_PUBLIC_REACT_APP_BASE_URL;

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

      // The registration endpoint is public, so we use the standard `fetch`
      const res = await fetch(`${BASE_URL}/api/users`, options);
      const result = await res.json();

      if (!res.ok) {
        // If the server returns an error, reject the promise with the error message
        return thunkAPI.rejectWithValue(result);
      }

      // If registration is successful, the backend should return tokens and user data
      if (result.accessToken && result.refreshToken && result.user) {
        thunkAPI.dispatch(
          setTokens({
            accessToken: result.accessToken,
            refreshToken: result.refreshToken,
          })
        );
        thunkAPI.dispatch(newUser(result.user));
      }

      // The thunk should return the user data to be stored in state
      return result.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export default createUser;
