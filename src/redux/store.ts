'use client';

import { configureStore } from '@reduxjs/toolkit';
import MALReducer from './features/MAL';
import UserReducer from './features/user';
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
