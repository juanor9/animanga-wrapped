import { createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = process.env.NEXT_PUBLIC_REACT_APP_BASE_URL || 'https://localhost:3000';

const uploadImage = createAsyncThunk('uploads/uploadImage', async (recievedData) => {
  const { file, listUsername, filename } = recievedData;
  const formData = new FormData();
  const options = {
    method: 'POST',
    body: formData,
  };

  formData.append('image', file);
  if (filename) {
    formData.append('imageName', 'filename');
  } else {
    formData.append('imageName', `${listUsername}-${file.name}`);
  }

  formData.append('username', listUsername);

  const response = await fetch(`${BASE_URL}/api/upload/image`, options);
  const data = await response.json();
  return data;
});

export default uploadImage;
