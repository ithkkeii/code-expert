import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from '@/src/app/axios-base-query';

interface Profile {
  id: string;
  name: string;
  email: string;
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    currentUser: builder.query<Profile, void>({
      query: () => ({
        url: 'api/v1/users/current-user',
        method: 'GET',
      }),
    }),
  }),
});

export const { useCurrentUserQuery } = authApi;
