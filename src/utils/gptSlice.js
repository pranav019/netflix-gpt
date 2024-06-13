import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gpt",
  initialState: {
    showGptSearches: false,
  },
  reducers: {
    toggleGptSerachView: (state, action) => {
      state.showGptSearches = !state.showGptSearches;
    },
  },
});

export const { toggleGptSerachView } = gptSlice.actions;
export default gptSlice.reducer;
