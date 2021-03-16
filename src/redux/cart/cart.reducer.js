import { CartActionTypes } from './cart.types';

const INITIAL_STATE = {
  display: false,
};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CartActionTypes.TOGGLE_CART_VISIBILITY:
      return {
        ...state,
        display: !state.display,
      };

    default:
      return state;
  }
};

export default cartReducer;
