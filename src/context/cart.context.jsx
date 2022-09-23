import { createContext, useState } from 'react';
import { addItemToCart as addItem, removeItemFromCart as removeItem } from '../redux/cart/cart.utils';

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => false,
  cartItems: [],
  addItemToCart: () => {
  },
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const addItemToCart = (item) => {
    setCartItems(addItem(cartItems, item));
  };

  const removeItemFromCart = (item) => {
    setCartItems(removeItem(cartItems, item));
  };

  const value = {
    isCartOpen, setIsCartOpen, cartItems, addItemToCart, removeItemFromCart
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};