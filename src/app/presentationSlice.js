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

const presentationSlice = createSlice({
  name: 'presentation',
  initialState,
  reducers: {}
});

const presentationReducer = presentationSlice.reducer;
// export const { loginUser, logoutUser } = presentationSlice.actions;
export default presentationReducer;
