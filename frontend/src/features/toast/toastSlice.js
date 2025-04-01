import { createSlice } from "@reduxjs/toolkit";

const toastColors = {
  "success": "#22c55e",
  "error": "#ef4444",
  "message": "#0ea5e9",
};

const initialState = {
  type: "message",
  message: "Loading...",
  timeout: 3,
  showToast: true,
};


export const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    hideToast: (state, action) => {
      state.type = "";
      state.message = "";
      state.timeout = 3;
      state.showToast = false;
    },
    setToast: (state, action) => {
      state.type = action.payload.type.toLowerCase();
      state.message = action.payload.message;
      state.timeout = action.payload.timeout || 3;
      state.showToast = true;
    },
  },
});

export const selectShowToast = (state) => state.toast.showToast;
export const selectMessage = (state) => state.toast.message;
export const selectType = (state) => state.toast.type;
export const selectToastColor = (state) => toastColors[state.toast.type];
export const selectTimeout = (state) => state.toast.timeout;

export const { hideToast, setToast } = toastSlice.actions;
export default toastSlice.reducer;
