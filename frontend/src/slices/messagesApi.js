import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import routes from '../routes';

const messagesApi = createApi({
  reducerPath: 'messages',
  baseQuery: fetchBaseQuery({ baseUrl: routes.messagesPath }),
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: () => '',
    }),
  }),
});

export const { useGetMessageQuery } = messagesApi;
