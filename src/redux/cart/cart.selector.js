import { createSelector } from 'reselect';

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
  (cartItems) =>
    cartItems.reduce(
      (totalQuantity, cartItem) => totalQuantity + cartItem.quantity,
      0,
    ),
);

export const selectCartTotal = createSelector(
    [selectCartItems],
    (cartItems) =>
        cartItems.reduce(
            (totalQuantity, cartItem) => totalQuantity + cartItem.quantity * cartItem.price,
            0,
        ),
);
