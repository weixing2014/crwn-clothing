import React, { useContext } from 'react';
import './Shop.styles.scss';
import CollectionPreview from '../../components/CollectionPreview/CollectionPreview.component';
import { ProductContext } from '../../context/products.context';

const ShopPage = () => {
  const { products } = useContext(ProductContext);

  return (
    <div className='shop-page'>
        {products
        .map(({ id, ...otherProps }) => (
          <CollectionPreview key={id} {...otherProps} />
        ))}
    </div>
  );
};

export default ShopPage;
