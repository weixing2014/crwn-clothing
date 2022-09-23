import React, { useContext } from 'react';
import './CheckoutItem.component.scss';
import { removeItem } from '../../redux/cart/cart.actions';
import { CartContext } from '../../context/cart.context';

function CheckoutItem({ item }) {
  const { addItemToCart, removeItemFromCart } = useContext(CartContext);

  return (
    <div className='checkout-item'>
      <div className='image-container'>
        <img alt='item' src={item.imageUrl} />
      </div>
      <span className='name'>{item.name}</span>
      <span className='quantity'>
        <span
          className='quantity-minus'
          onClick={() => removeItemFromCart(item)}
        >
          &#8249;
        </span>
        {item.quantity}
        <span
          className='quantity-plus'
          onClick={() => addItemToCart(item)}
        >
          &#8250;
        </span>
      </span>
      <span className='price'>${item.price}</span>
      <span className='remove-button' onClick={() => removeItem(item.id)}>
        &#10005;
      </span>
    </div>
  );
}

export default CheckoutItem;
