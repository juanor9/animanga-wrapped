/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import createuser from '../../app/features/registration/services/registration';
import { getUserProfile, getUserData } from '../../app/features/userPage/services/userPage';

const initialState = {
  user: {},
};

const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
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

export const { newUser } = UserSlice.actions;

export default UserSlice.reducer;
