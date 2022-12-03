import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  title: '',
  questions: [
    {
      question: '',
      answers: [],
      answer: ''
    }
  ],
  id: ''
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginUser: (state, action) => {},
    logoutUser: (state) => {}
  }
});

const authReducer = authSlice.reducer;
export const { loginUser, logoutUser } = authSlice.actions;
export default authReducer;
