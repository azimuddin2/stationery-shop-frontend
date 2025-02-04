import { TResponseRedux } from '../../../types';
import { TReview } from '../../../types/review.type';
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
      transformResponse: (response: TResponseRedux<TReview[]>) => {
        return {
          data: response.data,
        };
      },
    }),
  }),
});

export const { useAddReviewMutation, useGetAllReviewsQuery } = reviewApi;
