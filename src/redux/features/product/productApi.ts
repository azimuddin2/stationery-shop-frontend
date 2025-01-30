import { TQueryParam, TResponseRedux } from '../../../types';
import { TProduct } from '../../../types/product.type';
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
    getAllProduct: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: '/products',
          method: 'GET',
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TProduct[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    getProductById: builder.query({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'GET',
      }),
    }),
    updateProduct: builder.mutation<
      TProduct,
      { id: string; body: Partial<TProduct> }
    >({
      query: ({ id, body }) => ({
        url: `/products/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Product'] as any,
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Product'] as any,
    }),
  }),
});

export const {
  useAddProductMutation,
  useGetAllProductQuery,
  useGetProductByIdQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
