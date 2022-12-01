import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    username: '',
    email: ''
  },
  reducers: {
    loginUser: (state, action) => {
      const { username, email } = action.payload;
      state.username = username;
      state.email = email;
    },
    logoutUser: (state) => {
      state.userId = '';
    }
  }
});

const authReducer = authSlice.reducer;
export const { loginUser, logoutUser } = authSlice.actions;
export default authReducer;
