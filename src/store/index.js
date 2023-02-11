import { configureStore } from '@reduxjs/toolkit';
import { productsSlice } from './ProductsSlice';

export const store = configureStore({
  reducer: { products: productsSlice.reducer },
});
