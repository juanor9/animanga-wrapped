import { createSlice } from '@reduxjs/toolkit';
import { createUser, login } from '../services/users';

const initialState = {
  userData: null,
  userToken: null,
  loginAttempts: 0,
  isLocked: false,
  lockoutEndTime: null,
  error: null,
  loading: false,
};

const usersSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    reset: () => initialState,
    logout: (state) => {
      state.userData = null;
      state.userToken = null;
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem('userToken');
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.fulfilled, (state, action) => {
        state.userData = action.payload;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload.profile;
        state.userToken = action.payload.userToken;
        state.loginAttempts = 0;
        state.isLocked = false;
        state.lockoutEndTime = null;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
        if (action.payload.message === 'Invalid password') {
          state.loginAttempts += 1;
        }
        if (state.loginAttempts >= 5) {
          state.isLocked = true;
          const lockoutDuration = 2 * 60 * 60 * 1000; // 2 hours
          state.lockoutEndTime = new Date().getTime() + lockoutDuration;
        }
        if (action.payload.message === 'Account locked. Try again later.') {
          state.isLocked = true;
          // If the server says the account is locked, but we don't have a lockout time, set it.
          if (!state.lockoutEndTime || new Date().getTime() > state.lockoutEndTime) {
            const lockoutDuration = 2 * 60 * 60 * 1000; // 2 hours
            state.lockoutEndTime = new Date().getTime() + lockoutDuration;
          }
        }
      });
  },
});
export const { reset, logout } = usersSlice.actions;
export default usersSlice.reducer;
