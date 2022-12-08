import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  presentId: ''
};

const presentationSlice = createSlice({
  name: 'presentation',
  initialState,
  reducers: {
    startEditPresent: (state, action) => {
      state.presentId = action.payload;
    },
    cancelEditPresent: (state) => {
      state.presentId = '';
    }
  }
});

const presentationReducer = presentationSlice.reducer;
export const { startEditPresent, cancelEditPresent } = presentationSlice.actions;
export default presentationReducer;
