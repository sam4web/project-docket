import { createSlice } from "@reduxjs/toolkit";
import {
  refreshAuthToken,
  sendDeleteUserRequest,
  sendLoginRequest,
  sendLogoutRequest,
  sendRegistrationRequest,
} from "@/features/user/userThunks.js";
import { clearUserReducer, setUserReducer } from "@/features/user/userReducer.js";

const initialState = {
  user: null,
  token: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendLoginRequest.fulfilled, setUserReducer)
      .addCase(sendRegistrationRequest.fulfilled, setUserReducer)
      .addCase(refreshAuthToken.fulfilled, setUserReducer)
      .addCase(sendLogoutRequest.fulfilled, clearUserReducer)
      .addCase(sendDeleteUserRequest.fulfilled, clearUserReducer);
  },
});


export const selectCurrentToken = (state) => state.user.token;
export const selectUserInfo = (state) => state.user.user;

export default userSlice.reducer;