'use client';

import { configureStore } from '@reduxjs/toolkit';
import MALReducer from './features/MAL';

export const store = configureStore({
  reducer: {
    MALReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
