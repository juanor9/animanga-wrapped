'use client';

import { configureStore } from '@reduxjs/toolkit';
import MALReducer from './features/MAL';
import UploadsReducer from './features/uploads';
import UserReducer from '../app/features/user/reducer/userSlice';

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
