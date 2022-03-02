import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface Profile {
  id: string;
  name: string;
  email: string;
}

interface SignInInfo {
  email: string;
  password: string;
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://codeexpert.dev/api/v1/users' }),
  endpoints: (builder) => ({
    signIn: builder.mutation<Profile, SignInInfo>({
      query: (body) => ({
        url: 'sign-in',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useSignInMutation } = authApi;
