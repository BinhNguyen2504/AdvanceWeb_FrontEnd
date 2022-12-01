import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    username: '',
    email: '',
    id: ''
  },
  reducers: {
    loginUser: (state, action) => {
      const { username, email, id } = action.payload;
      state.username = username;
      state.email = email;
      state.id = id;
    },
    logoutUser: (state) => {
      state.userId = '';
    }
  }
});

const authReducer = authSlice.reducer;
export const { loginUser, logoutUser } = authSlice.actions;
export default authReducer;
