import { CartActionTypes } from './cart.types';

const INITIAL_STATE = {
  display: false,
  cartItems: [],
};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CartActionTypes.TOGGLE_CART_VISIBILITY:
      return {
        ...state,
        display: !state.display,
      };
    case CartActionTypes.ADD_ITEM:
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
      }
    default:
      return state;
  }
};

export default cartReducer;
