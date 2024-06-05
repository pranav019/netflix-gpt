import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import moviesReducer from "./movieSlice";

const appStore = configureStore({
  reducer: {
    // user is the name of the slice user that we defined in the userSlice and the reducer attached to it
    user: userReducer,
    movies: moviesReducer,
  },
});
export default appStore;
