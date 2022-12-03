import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: '',
  email: '',
  id: ''
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginUser: (state, action) => {
      const { username, email, id } = action.payload;
      state.id = id;
      state.email = email;
      state.username = username;
    },
    logoutUser: (state) => {
      state.id = '';
      state.email = '';
      state.username = '';
    }
  }
});

const authReducer = authSlice.reducer;
export const { loginUser, logoutUser } = authSlice.actions;
export default authReducer;
