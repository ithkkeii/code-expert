import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from '@/src/app/axios-base-query';

interface Profile {
  id: string;
  name: string;
  email: string;
}

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: axiosBaseQuery(),
  // tagTypes: ['Profile'],
  endpoints: (builder) => ({
    signIn: builder.mutation<Profile, { email: string; password: string }>({
      query: (body) => ({
        url: 'api/v1/users/sign-in',
        method: 'POST',
        data: body,
      }),
    }),
    currentUser: builder.query<Profile, void>({
      query: () => ({
        url: 'api/v1/users/current-user',
        method: 'GET',
      }),
    }),
  }),
});

export const { useCurrentUserQuery, useSignInMutation } = apiSlice;
