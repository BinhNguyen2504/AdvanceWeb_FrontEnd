import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userId: ''
  },
  reducers: {
    loginUser: (state, action) => {
      state.userId = action.payload;
    },
    logoutUser: (state) => {
      state.userId = '';
    }
  }
});

const authReducer = authSlice.reducer;
export const { cancelEditPost, startEditPost } = authSlice.actions;
export default authReducer;
