import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gpt",
  initialState: {
    showGptSearches: false,
    movieNames: null,
    movieResults: null,
  },
  reducers: {
    toggleGptSerachView: (state, action) => {
      state.showGptSearches = !state.showGptSearches;
    },
    addGptMovieResults: (state, action) => {
      const { movieNames, movieResults } = action.payload;
      state.movieNames = movieNames;
      state.movieResults = movieResults;
    },
  },
});

export const { toggleGptSerachView, addGptMovieResults } = gptSlice.actions;
export default gptSlice.reducer;
