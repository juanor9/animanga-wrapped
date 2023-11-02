'use client';

import { configureStore } from '@reduxjs/toolkit';
import MALReducer from './features/MAL';
import UserReducer from './features/user';

export const store = configureStore({
  reducer: {
    MALReducer,
    UserReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
