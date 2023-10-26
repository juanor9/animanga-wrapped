/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import createuser from '../../app/features/registration/services/registration';

const initialState = {
  user: {},
};

const MALSlice = createSlice({
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
    // builder.addCase(getLibrariesById.fulfilled, (state, action) => {
    //   state.user = action.payload;
    // });
    // builder.addCase(getLibrariesByFilter.fulfilled, (state, action) => {
    //   state.user = action.payload;
    // });
  },
});

export const { newUser } = MALSlice.actions;

export default MALSlice.reducer;
