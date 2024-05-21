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
  tagTypes: ['Channel'],
  endpoints: (builder) => ({
    getChannels: builder.query({
      query: () => '',
      providesTags: [{ type: 'Channel', id: 'LIST' }],
    }),
    addChannel: builder.mutation({
      query: (channel) => ({
        url: '',
        method: 'POST',
        body: channel,
      }),
      invalidatesTags: [{ type: 'Channel', id: 'LIST' }],
    }),
    editChannel: builder.mutation({
      query: ({ id, ...body }) => ({
        url: id,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: [{ type: 'Channel', id: 'LIST' }],
    }),
    removeChannel: builder.mutation({
      query: (id) => ({
        url: `${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Channel', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetChannelsQuery,
  useAddChannelMutation,
  useEditChannelMutation,
  useRemoveChannelMutation,
} = channelsApi;
