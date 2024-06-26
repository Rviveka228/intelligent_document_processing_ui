import {createSlice} from '@reduxjs/toolkit';

const floorDataslice = createSlice({
  name: 'floorData',
  initialState: {
    data: [],
    validator: [],
  },
  reducers: {
    floorDataFetch: (state, action) => {
      state.data = action.payload;
    },
    validateDataFetch: (state, action) => {
      state.validator = action.payload;
    },
  },
});
export const {floorDataFetch, validateDataFetch} = floorDataslice.actions;

export default floorDataslice.reducer;
