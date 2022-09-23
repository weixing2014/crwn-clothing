import { createContext, useState } from 'react';
import PRODUCTS from '../pages/Shop/Shop.data';

export const ProductContext = createContext({
  products: [],
});

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState(PRODUCTS);
  return <ProductContext.Provider value={{
    products,
    setProducts
  }}>{children}</ProductContext.Provider>;
};