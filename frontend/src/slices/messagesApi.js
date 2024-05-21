import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { getToken } from './authSlice.js';
import routes from '../routes.js';

export const messagesApi = createApi({
  reducerPath: 'messages',
  baseQuery: fetchBaseQuery({
    baseUrl: routes.messagesPath,
    prepareHeaders: (headers, { getState }) => {
      const token = getToken(getState());
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Message'],
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: () => '',
      providesTags: [{ type: 'Message', id: 'LIST' }],
    }),
    addMessage: builder.mutation({
      query: (channel) => ({
        url: '',
        method: 'POST',
        body: channel,
      }),
      invalidatesTags: [{ type: 'Message', id: 'LIST' }],
    }),
    removeMessage: builder.mutation({
      query: (id) => ({
        url: `${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Message', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetMessagesQuery,
  useAddMessageMutation,
  useRemoveMessageMutation,
} = messagesApi;
