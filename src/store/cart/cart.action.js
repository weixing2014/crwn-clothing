import { createAction } from '../../utils/reducer/reducer.utils';
import { CART_ACTION_TYPES } from './cart.types';
import {
  createOrUpdateUserCart,
  getCategoriesAndDocuments,
  getUserCartItems,
} from '../../utils/firebase/firebase.utils';
import { fetchCategoriesFailed, fetchCategoriesStart, fetchCategoriesSuccess } from '../categories/category.action';

const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id,
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem,
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, cartItemToRemove) => {
  // find the cart item to remove
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id,
  );

  // check if quantity is equal to 1, if it is remove that item from the cart
  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }

  // return back cartitems with matching cart item with reduced quantity
  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem,
  );
};

const clearCartItem = (cartItems, cartItemToClear) =>
  cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);

export const addItemToCart = (cartItems, productToAdd) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const addItemToCartAsync = (currentUser, cartItems, productToAdd) => async (dispatch) => {
  return setUserCartItemsAsync(dispatch, currentUser, addCartItem(cartItems, productToAdd));
};

const setUserCartItemsAsync = (dispatch, currentUser, cartItems) => {
  if (currentUser) {
    createOrUpdateUserCart(currentUser, cartItems);
  }
  return dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems));
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
  const newCartItems = removeCartItem(cartItems, cartItemToRemove);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const removeItemFromCartAsync = (currentUser, cartItems, cartItemToRemove) => async (dispatch) => {
  return setUserCartItemsAsync(dispatch, currentUser, removeCartItem(cartItems, cartItemToRemove));
};

export const clearItemFromCart = (cartItems, cartItemToClear) => {
  const newCartItems = clearCartItem(cartItems, cartItemToClear);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const clearItemFromCartAsync = (currentUser, cartItems, cartItemToClear) => async (dispatch) => {
  return setUserCartItemsAsync(dispatch, currentUser, clearCartItem(cartItems, cartItemToClear));
};

export const setIsCartOpen = (boolean) =>
  createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean);

export const getUserCartItemsAsync = (currentUser) => async (dispatch) => {
  const cartItems = await getUserCartItems(currentUser);
  return dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems));
};