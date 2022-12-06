import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  socket: null
};

const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    createSocket(state, action) {
      state.socket = action.payload;
    }
  }
});

const socketReducer = socketSlice.reducer;
export const { createSocket } = socketSlice.actions;
export default socketReducer;
