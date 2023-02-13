import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  // players: [
  //   {name: 'Earl', score: 1500},
  //   {name: 'Fat', score: 653},
  //   {name: 'Grant', score: 234},
  //   {name: 'Riley', score: 1500},
  //   {name: 'Tim', score: 653},
  //   {name: 'Lyn', score: 234},
  // ],
  players: [],
  currentPlayer: '',
  currentScore: 0,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setPlayers: (state, action) => {
      state.players = action.payload;
    },
    setCurrentPlayer: (state, action) => {
      state.currentPlayer = action.payload;
    },
    setCurrentScore: (state, action) => {
      state.currentScore = action.payload;
    },
  },
});

export const {setPlayers, setCurrentPlayer, setCurrentScore} =
  usersSlice.actions;

export default usersSlice.reducer;
