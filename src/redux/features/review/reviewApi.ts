import { baseApi } from '../../api/baseApi';

const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addReview: builder.mutation({
      query: (reviewInfo) => ({
        url: '/reviews/create-review',
        method: 'POST',
        body: reviewInfo,
      }),
    }),
    getAllReviews: builder.query({
      query: () => ({
        url: '/reviews',
        method: 'GET',
      }),
    }),
  }),
});

export const { useAddReviewMutation, useGetAllReviewsQuery } = reviewApi;
