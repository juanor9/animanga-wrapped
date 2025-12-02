'use client';

import { configureStore } from '@reduxjs/toolkit';
import MALReducer from './features/MAL';
import UploadsReducer from './features/uploads';
import UserReducer from './features/user';
import userDataReducer from '../app/[locale]/features/user/reducer/userSlice';

export const store = configureStore({
  reducer: {
    MALReducer,
    UserReducer,
    UploadsReducer,
    userData: userDataReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
