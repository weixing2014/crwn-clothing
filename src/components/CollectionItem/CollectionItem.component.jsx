import React from 'react';
import { connect } from 'react-redux';
import './CollectionItem.component.scss';
import CustomButton from '../CustomButton/CustomButton.component';
import { addItem } from '../../redux/cart/cart.actions';

function CollectionItem({ item, addItem }) {
  const { imageUrl, name, price } = item;

  return (
    <div className="collection-item">
      <div className="image" style={{ backgroundImage: `url(${imageUrl}` }} />
      <div className="collection-footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <div className="add-to-cart">
        <CustomButton onClick={() => addItem(item)}>Add to cart</CustomButton>
      </div>
    </div>
  );
}

export default connect(null, { addItem })(CollectionItem);
