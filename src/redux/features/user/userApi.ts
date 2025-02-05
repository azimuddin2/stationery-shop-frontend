import { TQueryParam, TResponseRedux } from '../../../types';
import { TRegisterUser } from '../../../types/user.type';
import { baseApi } from '../../api/baseApi';

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (userInfo) => ({
        url: '/users/register',
        method: 'POST',
        body: userInfo,
      }),
    }),
    getUsers: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: '/users',
          method: 'GET',
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TRegisterUser[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    updateUser: builder.mutation({
      query: (args) => ({
        url: `/users/${args.email}`,
        method: 'PATCH',
        body: args.data,
      }),
      invalidatesTags: ['user'] as any,
    }),
    updateUserStatus: builder.mutation({
      query: (args) => ({
        url: `/users/change-status/${args.id}`,
        method: 'PATCH',
        body: args.data,
      }),
      invalidatesTags: ['user'] as any,
    }),
  }),
});

export const {
  useRegisterMutation,
  useGetUsersQuery,
  useUpdateUserMutation,
  useUpdateUserStatusMutation,
} = userApi;
