import { createSlice } from '@reduxjs/toolkit';
import { createUser, login } from '../services/users';

const initialState = {
  userData: null,
  userToken: null,
  loginAttempts: 0,
  isLocked: false,
  lockoutEndTime: null,
  error: null,
  infoMessage: null, // Added for non-critical messages
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
    clearInfoMessage: (state) => {
      state.infoMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.fulfilled, (state, action) => {
        // Check if the payload contains a user object or a message
        if (action.payload.user) {
          state.userData = action.payload.user; // Or handle as needed
          state.infoMessage = null; // Clear previous info messages
        } else if (action.payload.message) {
          state.infoMessage = action.payload.message;
        }
        state.error = null;
      })
      .addCase(createUser.rejected, (state, action) => {
        // Handle unexpected registration errors
        state.error = action.payload.message || 'An unexpected error occurred during registration.';
        state.infoMessage = null;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.infoMessage = null; // Clear info messages on new login attempt
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
        // Generic error handling as per security requirements
        state.error = action.payload.message;
        state.loginAttempts += 1;

        if (state.loginAttempts >= 5) {
          state.isLocked = true;
          const lockoutDuration = 2 * 60 * 60 * 1000; // 2 hours
          state.lockoutEndTime = new Date().getTime() + lockoutDuration;
        }

        // The server might also send a specific "Account locked" message
        if (action.payload.message === 'Account locked. Try again later.') {
          state.isLocked = true;
          if (!state.lockoutEndTime || new Date().getTime() > state.lockoutEndTime) {
            const lockoutDuration = 2 * 60 * 60 * 1000; // 2 hours
            state.lockoutEndTime = new Date().getTime() + lockoutDuration;
          }
        }
      });
  },
});

export const { reset, logout, clearInfoMessage } = usersSlice.actions;
export default usersSlice.reducer;
