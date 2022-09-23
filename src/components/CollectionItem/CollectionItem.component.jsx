import React, { useContext } from 'react';
import './CollectionItem.component.scss';
import CustomButton from '../CustomButton/CustomButton.component';
import { CartContext } from '../../context/cart.context';

function CollectionItem({ item, addItem }) {
  const { imageUrl, name, price } = item;
  const { addItemToCart } = useContext(CartContext);

  return (
    <div className="collection-item">
      <div className="image" style={{ backgroundImage: `url(${imageUrl}` }} />
      <div className="collection-footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <div className="add-to-cart">
        <CustomButton onClick={() => addItemToCart(item)}>Add to cart</CustomButton>
      </div>
    </div>
  );
}

export default CollectionItem;
