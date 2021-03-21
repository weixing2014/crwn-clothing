import { CartActionTypes } from './cart.types';
import { addItemToCart } from './cart.utils';

const INITIAL_STATE = {
  visible: false,
  cartItems: [],
};

const cartReducer = (state = INITIAL_STATE, action) => {
  console.log('here');
  switch (action.type) {
    case CartActionTypes.TOGGLE_CART_VISIBILITY:
      return {
        ...state,
        visible: !state.visible,
      };
    case CartActionTypes.ADD_ITEM:
      return {
        ...state,
        cartItems: addItemToCart(state.cartItems, action.payload),
      };
    case CartActionTypes.REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (cartItem) => cartItem.id !== action.payload,
        ),
      };
    case CartActionTypes.UPDATE_ITEM_QUANTITY:
      return {
        ...state,
        cartItems: state.cartItems
          .map((cartItem) => {
            if (cartItem.id === action.payload.id) {
              const nextQuantity = cartItem.quantity + action.payload.by;

              if (!nextQuantity) return null;

              return {
                ...cartItem,
                quantity: cartItem.quantity + action.payload.by,
              };
            }

            return cartItem;
          })
          .filter((cartItem) => !!cartItem),
      };
    default:
      return state;
  }
};

export default cartReducer;
