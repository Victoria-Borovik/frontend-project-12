import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice.js';
import { channelsApi } from './channelsApi.js';

export default configureStore({
  reducer: {
    auth: authReducer,
    [channelsApi.reducerPath]: channelsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => (
    getDefaultMiddleware().concat(channelsApi.middleware)
  ),
});
