/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  malData: {},
};

const MALSlice = createSlice({
  name: 'malCodeVerifier',
  initialState,
  reducers: {
    setMalData: (state, action) => {
      state.malData = action.payload;
    },
  },
});

export const { setMalData } = MALSlice.actions;

export default MALSlice.reducer;
