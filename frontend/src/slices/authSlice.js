/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const getInitialState = () => {
  const defaultUserData = { username: null, token: null, isAuth: false };
  const savedState = localStorage.getItem('user');
  if (!savedState) {
    return defaultUserData;
  }
  try {
    const parsedState = JSON.parse(savedState);
    return { ...parsedState, isAuth: true };
  } catch {
    return defaultUserData;
  }
};

const authSlice = createSlice({
  name: 'auth',
  initialState: getInitialState(),
  reducers: {
    login: (state, { payload }) => {
      window.localStorage.setItem('user', JSON.stringify(payload));
      state.isAuth = true;
      state.username = payload.username;
      state.token = payload.token;
    },
    logout: (state) => {
      window.localStorage.removeItem('user');
      state.isAuth = false;
      state.username = null;
      state.token = null;
    },
  },
});
export const { login, logout } = authSlice.actions;

export const getUsername = (state) => state.auth.username;
export const getToken = (state) => state.auth.token;
export const getIsAuth = (state) => state.auth.isAuth;

export default authSlice.reducer;
