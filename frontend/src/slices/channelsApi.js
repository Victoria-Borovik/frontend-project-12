import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { getToken } from './authSlice.js';
import routes from '../routes.js';

export const channelsApi = createApi({
  reducerPath: 'channels',
  baseQuery: fetchBaseQuery({
    baseUrl: routes.channelsPath,
    prepareHeaders: (headers, { getState }) => {
      const token = getToken(getState());
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getChannels: builder.query({
      query: () => '',
    }),
  }),
});

export const { useGetChannelsQuery } = channelsApi;
