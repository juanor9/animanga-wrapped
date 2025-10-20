/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import createuser from '../../app/features/registration/services/registration';
import { getUserProfile, getUserData } from '../../app/features/userPage/services/userPage';

const initialState = {
  user: {},
  accessToken: null,
  refreshToken: null,
};

const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setTokens: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    logout: (state) => {
      state.user = {};
      state.accessToken = null;
      state.refreshToken = null;
    },
    newUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createuser.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(getUserProfile.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(getUserData.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    // builder.addCase(getLibrariesByFilter.fulfilled, (state, action) => {
    //   state.user = action.payload;
    // });
  },
});

export const { setTokens, setAccessToken, logout, newUser } = UserSlice.actions;

export default UserSlice.reducer;
