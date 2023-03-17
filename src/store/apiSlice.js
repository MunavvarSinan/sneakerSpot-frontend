import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://shoestore-backend-903b.onrender.com/api',
  }),
  endpoints: (builder) => ({
    //builder.query for get requests
    //builder.mutation for post requests
    getProducts: builder.query({
      query: () => '/product',
    }),
    getProduct: builder.query({
      query: (id) => `/product/${id}`,
    }),
    createOrder: builder.mutation({
      query: (newOrder) => ({
        url: '/order',
        method: 'POST',
        body: newOrder,
      }),
    }),
    gerOrder: builder.query({
      query: (id) => `/order/${id}`,
    }),
  }),
});

export const {
  useGetProductQuery,
  useGetProductsQuery,
  useCreateOrderMutation,
  useGerOrderQuery,
} = apiSlice;
