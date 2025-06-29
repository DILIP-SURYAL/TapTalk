import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice.js";
import messageSlice from "./messageSlice.js";
const store = configureStore({
  reducer: {
    user: userReducer,
    message: messageSlice,
  },
});

export default store;
