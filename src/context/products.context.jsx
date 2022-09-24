import { createContext, useEffect, useState } from 'react';
import { getCategoriesAndDocuments } from '../firebase/firebase.utils';

export const ProductContext = createContext({
  products: [],
});


export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments();
      console.log(categoryMap);
      return categoryMap;
    };

    getCategoriesMap().then((categoryMap) => setProducts(categoryMap));
  }, []);

  return <ProductContext.Provider value={{
    products,
    setProducts,
  }}>{children}</ProductContext.Provider>;
};