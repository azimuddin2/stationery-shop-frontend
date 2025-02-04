import { TQueryParam, TResponseRedux } from '../../../types';
import { TOrder } from '../../../types/order.type';
import { baseApi } from '../../api/baseApi';

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    placeOrder: builder.mutation({
      query: (orderInfo) => ({
        url: '/orders/create-order',
        method: 'POST',
        body: orderInfo,
      }),
    }),
    getOrders: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: '/orders',
          method: 'GET',
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TOrder[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    getOrdersByEmail: builder.query<TOrder[], string>({
      query: (email: string) => ({
        url: `/orders/my-orders?email=${email}`,
        method: 'GET',
      }),
      transformResponse: (response: any) => response.data,
    }),
    updateOrder: builder.mutation({
      query: (args) => ({
        url: `/orders/${args.id}`,
        method: 'PATCH',
        body: args.data,
      }),
      invalidatesTags: ['order'] as any,
    }),
    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `/orders/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['order'] as any,
    }),
  }),
});

export const {
  usePlaceOrderMutation,
  useGetOrdersQuery,
  useGetOrdersByEmailQuery,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
} = orderApi;
