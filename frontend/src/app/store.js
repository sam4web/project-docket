import { configureStore } from "@reduxjs/toolkit";
import noteReducer from "@/features/note/noteSlice.js";
import userReducer from "@/features/user/userSlice.js";
import toastReducer from "@/features/toast/toastSlice.js";

export const store = configureStore({
  reducer: {
    note: noteReducer,
    user: userReducer,
    toast: toastReducer,
  },
  devTools: import.meta.env.VITE_NODE_ENV === "development",
});