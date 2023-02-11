import { configureStore, createSelector } from '@reduxjs/toolkit';
import { productsSlice } from './ProductsSlice';
import { cartSlice } from './cartSlice';

export const store = configureStore({
  reducer: { products: productsSlice.reducer, cart: cartSlice.reducer },
});

export const selectSubTotal = (state) =>
  state.cart.items.reduce(
    // sum is the accumulator that is we defined as 0 in the end because we want to start from 0
    // cartItem is the current item in the array
    (sum, cartItem) => sum + cartItem.product.price * cartItem.quantity, // we want to return the sum of the previous sum and the current cartItem
    0, // this is the initial value of sum or the accumulator or the starting point
  );

const cartSelector = (state) => state.cart;

export const selectDeliveryPrice = createSelector(
  // if we have a selector that depends on another selector we can use createSelector
  // if we are having another relation to check we can add more selectors like this
  // then the callback function will have the same number of arguments as the number of selectors
  // const cartSelector = (state) => state.cart; this should be outside the createSelector
  // eg: if we need to add a cartItem selector then the callback function will have 2 arguments i.e (cartItem, subjectTotal)
  // so in this way we can create a selector that depends on another selector
  cartSelector,
  selectSubTotal,
  (cart, subTotal) =>
    subTotal > cart.freeDeliveryFrom || subTotal === 0 ? 0 : cart.deliveryFee,
);

export const selectTotal = createSelector(
  selectSubTotal,
  selectDeliveryPrice,
  (subTotal, deliveryPrice) => subTotal + deliveryPrice,
);
