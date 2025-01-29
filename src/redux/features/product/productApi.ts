import { baseApi } from '../../api/baseApi';

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addProduct: builder.mutation({
      query: (productInfo) => ({
        url: '/products/create-product',
        method: 'POST',
        body: productInfo,
      }),
    }),
  }),
});

export const { useAddProductMutation } = productApi;
