import { useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import { selectCategoriesIsLoading, selectCategoriesMap } from '../../store/categories/category.selector';
import PageSpinner from '../../components/page-spinner/page-spinner.component';

import CategoryPreview from '../../components/category-preview/category-preview.component';

const CategoriesPreview = () => {
  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectCategoriesIsLoading);

  return (
    isLoading ? <PageSpinner /> : <>
      {Object.keys(categoriesMap).map((title) => {
        const products = categoriesMap[title];
        return (
          <CategoryPreview key={title} title={title} products={products} />
        );
      })}
    </>
  );
};

export default CategoriesPreview;
