import React from 'react';
import './CheckoutItem.component.scss';
import { connect } from 'react-redux';
import { removeItem, updateItemQuantity } from '../../redux/cart/cart.actions';

function CheckoutItem({ item, removeItem, updateItemQuantity }) {
  return (
    <div className="checkout-item">
      <div className="image-container">
        <img alt="item" src={item.imageUrl} />
      </div>
      <span className="name">{item.name}</span>
      <span className="quantity">
        <span
          className="quantity-minus"
          onClick={() => updateItemQuantity(item.id, -1)}
        >
          &#8249;
        </span>
        {item.quantity}
        <span
          className="quantity-plus"
          onClick={() => updateItemQuantity(item.id, 1)}
        >
          &#8250;
        </span>
      </span>
      <span className="price">${item.price}</span>
      <span className="remove-button" onClick={() => removeItem(item.id)}>
        &#10005;
      </span>
    </div>
  );
}

export default connect(null, { removeItem, updateItemQuantity })(CheckoutItem);
