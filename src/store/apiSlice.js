import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://shoestore-backend-903b.onrender.com/api',
  }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => '/product',
    }),
    getProduct: builder.query({
      query: (id) => `/product/${id}`,
    }),
  }),
});

export const { useGetProductQuery, useGetProductsQuery } = apiSlice;
