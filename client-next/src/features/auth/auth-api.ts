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
  tagTypes: ['Profile'],
  endpoints: (builder) => ({
    signIn: builder.mutation<Profile, { email: string; password: string }>({
      query: (body) => ({
        url: 'api/v1/users/sign-in',
        method: 'POST',
        data: body,
      }),
      invalidatesTags: ['Profile'],
    }),
    signOut: builder.mutation<void, void>({
      query: () => ({
        url: 'api/v1/users/sign-out',
        method: 'POST',
      }),
      invalidatesTags: ['Profile'],
    }),
    signUp: builder.mutation<
      Profile,
      { name: string; email: string; password: string }
    >({
      query: (body) => ({
        url: 'api/v1/users/sign-up',
        method: 'POST',
        data: body,
      }),
      invalidatesTags: ['Profile'],
    }),
    currentUser: builder.query<Profile | null, void>({
      query: () => ({
        url: 'api/v1/users/current-user',
        method: 'GET',
      }),
      providesTags: ['Profile'],
      transformResponse: (responseData: { currentUser: Profile | null }) => {
        return responseData.currentUser;
      },
    }),
  }),
});

export const {
  useCurrentUserQuery,
  useSignInMutation,
  useSignOutMutation,
  useSignUpMutation,
} = apiSlice;
