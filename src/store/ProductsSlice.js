import { createSlice } from '@reduxjs/toolkit';
import products from '../data/products';

const initialState = {
  products: products,
  selectedProduct: null,
  wishListedProducts: [],
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSelectedProducts: (state, action) => {
      const productIndex = action.payload;
      console.log(productIndex)
      const productDetails = state.products[productIndex];
      // console.log(productDetails);
      state.selectedProduct = state.products.find(
        (p) => p.id === productDetails?.id || p.id === productIndex,
      );
    },
    setWishListedProducts: (state, action) => {
      
      const wishlist = action.payload;
      const prod = state.products.find((p) => p.id === wishlist);

      const wishlistedItem = state.wishListedProducts.find(
        (item) => item.wishlistItem.id === wishlist,
      );
      if (!wishlistedItem) {
        state.wishListedProducts.push({ wishlistItem: prod });
      } else {
        state.wishListedProducts = state.wishListedProducts.filter(
          (item) => item.wishlistItem.id !== wishlist,
        );
      }
    },
  },
});
