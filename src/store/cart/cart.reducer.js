import { CART_ACTION_TYPES } from './cart.types';
import { getUserCartItems } from '../../utils/firebase/firebase.utils';
import { createAction } from '../../utils/reducer/reducer.utils';

const CART_INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
};

export const cartReducer = (state = CART_INITIAL_STATE, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        cartItems: payload,
      };
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload,
      };
    default:
      return state;
  }
};

export const setUserCartItemsAsync = (currentUser) => async (dispatch) => {
  const cartItems = await getUserCartItems(currentUser);
  return dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems));
};