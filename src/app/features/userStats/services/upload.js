import { createAsyncThunk } from '@reduxjs/toolkit';
import authFetch from '../../../lib/authFetch';

const BASE_URL = process.env.NEXT_PUBLIC_REACT_APP_BASE_URL || 'https://localhost:3000';

const uploadImage = createAsyncThunk(
  'uploads/uploadImage',
  async (recievedData, thunkAPI) => {
    try {
      const { file, listUsername, filename } = recievedData;
      const formData = new FormData();

      formData.append('image', file);
      if (filename) {
        formData.append('imageName', 'filename');
      } else {
        formData.append('imageName', `${listUsername}-${file.name}`);
      }

      formData.append('username', listUsername);

      const options = {
        method: 'POST',
        body: formData,
        // NOTE: Content-Type is not set. The browser will automatically set it to
        // 'multipart/form-data' with the correct boundary for FormData.
      };

      const response = await authFetch(`${BASE_URL}/api/upload/image`, options);
      const data = await response.json();

      if (!response.ok) {
        return thunkAPI.rejectWithValue(data);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export default uploadImage;
