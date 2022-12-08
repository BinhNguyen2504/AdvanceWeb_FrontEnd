import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  pin: null,
  name: null,
  questions: [],
  numberOfQuestion: null,
  currentQuestion: 0
};

// ? Question type:
// {
//   "content": "What is your name",
//   "ansA": "kk",
//   "ansB": "oo",
//   "ansC": "hh",
//   "ansD": "aaaa",
//   "time": 15,
//    "_id": "638e34ed751902f9b36da8e4"
// }

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    initGame(state, action) {
      state.pin = action.payload.pin;
      state.name = action.payload.name;
      state.questions = action.payload.questions;
      state.numberOfQuestion = action.payload.numberOfQuestion;
    },
    nextQuestion(state, action) {
      state.currentQuestion = action.payload.id;
    }
  }
});

const gameReducer = gameSlice.reducer;
export const { initGame, nextQuestion } = gameSlice.actions;
export default gameReducer;
