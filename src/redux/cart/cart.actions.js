// Actions
import { CartActionTypes } from './cart.types';

export const toggleCartVisibility = () => ({
  type: CartActionTypes.TOGGLE_CART_VISIBILITY,
});

export const addItem = (item) => ({
  type: CartActionTypes.ADD_ITEM,
  payload: item,
});

export const removeItem = (itemID) => ({
  type: CartActionTypes.REMOVE_ITEM,
  payload: itemID,
});

export const updateItemQuantity = (itemID, by) => ({
  type: CartActionTypes.UPDATE_ITEM_QUANTITY,
  payload: {
    id: itemID,
    by,
  },
});
