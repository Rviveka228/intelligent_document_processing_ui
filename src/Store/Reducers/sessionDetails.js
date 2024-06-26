import {createSlice} from '@reduxjs/toolkit';

const sessionDetailsReducer = createSlice({
  name: 'session-details',
  initialState: {
    details: {},
  },
  reducers: {
    setSessionDetails(state, action) {
      state.details = action.payload;
    },
  },
});

export const {setSessionDetails} = sessionDetailsReducer.actions;

export default sessionDetailsReducer.reducer;
