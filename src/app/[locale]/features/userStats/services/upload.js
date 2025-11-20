import { createAsyncThunk } from '@reduxjs/toolkit';
import authFetch from '../../../../lib/authFetch';

const BASE_URL = process.env.NEXT_PUBLIC_REACT_APP_BASE_URL || 'http://localhost:3000';

const uploadImage = createAsyncThunk('uploads/uploadImage', async (uploadData, thunkAPI) => {
  try {
    const { file, type, listUsername, filename } = uploadData;

    if (!type || (type !== 'media' && type !== 'stats')) {
      return thunkAPI.rejectWithValue({
        error: "Invalid upload type specified. Must be 'media' or 'stats'.",
      });
    }

    const formData = new FormData();
    formData.append('image', file, filename);
    formData.append('type', type);

    if (type === 'stats') {
      if (!listUsername) {
        return thunkAPI.rejectWithValue({ error: "Username is required for 'stats' upload type." });
      }
      formData.append('username', listUsername);
    }

    const options = {
      method: 'POST',
      body: formData,
    };

    const response = await authFetch(`${BASE_URL}/api/upload`, options);
    const data = await response.json();

    if (!response.ok) {
      return thunkAPI.rejectWithValue(data);
    }

    return { url: data.secure_url };
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: error.message });
  }
});

export default uploadImage;
