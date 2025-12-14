 
import { createSlice } from '@reduxjs/toolkit';
import uploadImage from '../../app/[locale]/features/userStats/services/upload';

const initialState = {
  uploads: [],
};

const UserSlice = createSlice({
  name: 'uploads',
  initialState,
  reducers: {
    newUser: (state, action) => {
      state.uploads = [...state.uploads, action.payload];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(uploadImage.fulfilled, (state, action) => {
      if (action.payload) {
        state.user = action.payload;
      }
    });
  },
});

export const { newUser } = UserSlice.actions;

export default UserSlice.reducer;
