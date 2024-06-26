import {createSlice} from '@reduxjs/toolkit';

// Define the initial state using that type
const initialState = {
  fileUri: '',
  fileId: '',
};

export const fileExtractSlice = createSlice({
  name: 'fileInfo',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setPdfExtractInfo: (state, action) => {
      state.fileUri = action.payload.fileUri;
      state.fileId = action.payload.fileId;

    },
  },
});

export const fileExtractActions = fileExtractSlice.actions;

export default fileExtractSlice.reducer;
