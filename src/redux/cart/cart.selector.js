import { createSelector } from 'reselect';
import { getSelectCartTotal, getSelectItemCount } from './cart.utils';

const selectCart = (state) => state.cart;

export const selectCartItems = createSelector(
  [selectCart],
  (cart) => cart.cartItems,
);

export const selectCartVisibility = createSelector(
  [selectCart],
  (cart) => cart.visible,
);

export const selectCartItemsCount = createSelector(
  [selectCartItems],
  getSelectItemCount,
);

export const selectCartTotal = createSelector(
  [selectCartItems],
  getSelectCartTotal,
);
