import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  malCodeVerifier: "",
};

const MALSlice = createSlice({
  name: "malCodeVerifier",
  initialState,
  reducers: {
    setCodeVerifier: (state, action) => {
      state.code = action.payload;
    },
  },
});

export const { setCodeVerifier } = MALSlice.actions;

export default MALSlice.reducer;
