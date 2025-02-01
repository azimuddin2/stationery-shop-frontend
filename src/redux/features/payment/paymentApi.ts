import { TPayment } from '../../../types/payment.type';
import { baseApi } from '../../api/baseApi';

const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPaymentIntent: builder.mutation({
      query: (price) => ({
        url: '/payments/create-payment-intent',
        method: 'POST',
        body: { price },
      }),
    }),
    processPayment: builder.mutation({
      query: (paymentInfo) => ({
        url: '/payments/process-payment',
        method: 'POST',
        body: paymentInfo,
      }),
    }),
    getPaymentsByEmail: builder.query<TPayment[], string>({
      query: (email: string) => ({
        url: `/payments?email=${email}`,
        method: 'GET',
      }),
      transformResponse: (response: any) => response.data,
    }),
  }),
});

export const {
  useCreatePaymentIntentMutation,
  useProcessPaymentMutation,
  useGetPaymentsByEmailQuery,
} = paymentApi;
