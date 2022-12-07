import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  pin: null,
  name: null,
  questions: [],
  numberOfQuestion: null
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
      // state.socket = action.payload;
    }
  }
});

const gameReducer = gameSlice.reducer;
export const { intGame } = gameSlice.actions;
export default gameReducer;
