import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";

const appStore = configureStore({
  reducer: {
    // user is the name of the slice user that we defined in the userSlice and the reducer attached to it
    user: userReducer,
  },
});
export default appStore;
