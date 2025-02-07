import {
  BaseQueryApi,
  BaseQueryFn,
  createApi,
  DefinitionType,
  FetchArgs,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
import { logout, setUser, TUser } from '../features/auth/authSlice';
import { toast } from 'sonner';
import { TResponse } from '../../types';

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://stationery-shop-backend-rose.vercel.app/api',
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    if (token) {
      headers.set('authorization', token);
    }

    return headers;
  },
});

const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
  let result = (await baseQuery(args, api, extraOptions)) as TResponse<TUser>;

  if (result.error?.status === 404) {
    toast.error(result.error.data.message);
  }

  if (result.error?.status === 401) {
    const res = await fetch('https://stationery-shop-backend-rose.vercel.app/api/auth/refresh-token', {
      method: 'POST',
      credentials: 'include',
    });

    const data = await res.json();

    if (data?.data?.accessToken) {
      const user = (api.getState() as RootState).auth.user;

      api.dispatch(
        setUser({
          user,
          token: data.data.accessToken,
        }),
      );

      result = (await baseQuery(args, api, extraOptions)) as TResponse<TUser>;
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: baseQueryWithRefreshToken,
  endpoints: () => ({}),
});
