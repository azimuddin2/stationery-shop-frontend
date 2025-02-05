import { baseApi } from '../../api/baseApi';

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: '/auth/login',
        method: 'POST',
        body: userInfo,
      }),
    }),
    register: builder.mutation({
      query: (userInfo) => ({
        url: '/users/register',
        method: 'POST',
        body: userInfo,
      }),
    }),
    updateUser: builder.mutation({
      query: (args) => ({
        url: `/users/${args.email}`,
        method: 'PATCH',
        body: args.data,
      }),
      invalidatesTags: ['user'] as any,
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useUpdateUserMutation } =
  authApi;
