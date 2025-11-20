'use client';

import { configureStore } from '@reduxjs/toolkit';
import UserReducer from '../app/[locale]/features/user/reducer/userSlice';
import MALReducer from './features/MAL';
import UploadsReducer from './features/uploads';

export const store = configureStore({
  reducer: {
    MALReducer,
    UserReducer,
    UploadsReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
