import { createSlice } from '@reduxjs/toolkit';
import { createUser, sendMagicLink, verifyMagicLink } from '../services/users';

const initialState = {
  userData: null,
  userToken: null,
  magicLinkSent: false,
  magicLinkEmail: null,
  error: null,
  infoMessage: null,
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
        state.error =
          action.payload?.message ||
          action.error.message ||
          'An unexpected error occurred during registration.';
        state.infoMessage = null;
      })
      .addCase(sendMagicLink.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.magicLinkSent = false;
      })
      .addCase(sendMagicLink.fulfilled, (state, action) => {
        state.loading = false;
        state.magicLinkSent = true;
        state.magicLinkEmail = action.payload.email;
        state.error = null;
        state.infoMessage = action.payload.message;
      })
      .addCase(sendMagicLink.rejected, (state, action) => {
        state.loading = false;
        state.magicLinkSent = false;
        state.error = action.payload?.error || action.error.message || 'Failed to send magic link';
      })
      .addCase(verifyMagicLink.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyMagicLink.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload.user;
        state.userToken = action.payload.accessToken;
        state.error = null;
        state.magicLinkSent = false;
        state.magicLinkEmail = null;
      })
      .addCase(verifyMagicLink.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.error || action.error.message || 'Failed to verify magic link';
      });
  },
});

export const { reset, logout, clearInfoMessage } = usersSlice.actions;
export default usersSlice.reducer;
