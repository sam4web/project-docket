import { jwtDecode } from "jwt-decode";

export const setUserReducer = (state, action) => {
  const token = action.payload;
  const decoded = jwtDecode(token);
  state.token = token;
  state.user = { ...decoded.UserInfo };
};

export const clearUserReducer = (state, action) => {
  state.token = null;
  state.user = null;
};