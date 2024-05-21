import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice.js';
import { channelsApi } from './channelsApi.js';
import { messagesApi } from './messagesApi.js';
import uiReducer from './uiSlice.js';

export default configureStore({
  reducer: {
    auth: authReducer,
    [channelsApi.reducerPath]: channelsApi.reducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) => (
    getDefaultMiddleware()
      .concat(channelsApi.middleware)
      .concat(messagesApi.middleware)
  ),
});
