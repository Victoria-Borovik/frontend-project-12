/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const getInitialState = () => {
  const savedState = localStorage.getItem('user');
  return savedState
    ? { ...JSON.parse(savedState), isAuth: true }
    : { username: null, token: null, isAuth: false };
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
    },
  },
});
export const { login, logout } = authSlice.actions;

export const getUsername = (state) => state.auth.username;
export const getToken = (state) => state.auth.token;
export const getIsAuth = (state) => state.auth.isAuth;

export default authSlice.reducer;
