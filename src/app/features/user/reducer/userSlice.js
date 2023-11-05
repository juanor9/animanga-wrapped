import { createSlice } from '@reduxjs/toolkit';
import { createUser } from '../services/users';

const initialState = {
  userData: [],
};

const usersSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    reset: (state) => {
      state.userData = initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.userData = action.payload;
    });
  },
});
export const { reset } = usersSlice.actions;
export default usersSlice.reducer;
