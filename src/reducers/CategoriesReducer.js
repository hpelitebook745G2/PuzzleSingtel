import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  selectedCategory: {},
  countries: [],
  pokemons: [],
  fruits: [],
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setCountries: (state, action) => {
      state.countries = action.payload;
    },
    setPokemons: (state, action) => {
      state.pokemons = action.payload;
    },

    setFruits: (state, action) => {
      state.fruits = action.payload;
    },
  },
});

export const {setSelectedCategory, setCountries, setPokemons, setFruits} =
  categoriesSlice.actions;

export default categoriesSlice.reducer;
