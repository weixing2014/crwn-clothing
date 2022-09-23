import React, { useContext } from 'react';

import './Checkout.component.scss';
import CheckoutItem from '../../components/CheckoutItem/CheckoutItem.component';
import { CartContext } from '../../context/cart.context';
import { getSelectCartTotal } from '../../redux/cart/cart.utils';

function CheckoutPage() {
  const { cartItems } = useContext(CartContext);
  const total = getSelectCartTotal(cartItems);

  return (
    <div className='checkout-page'>
      <div className='checkout-header'>
        <div className='header-block'>
          <span>Product</span>
        </div>
        <div className='header-block'>
          <span>Description</span>
        </div>
        <div className='header-block'>
          <span>Quantity</span>
        </div>
        <div className='header-block'>
          <span>Price</span>
        </div>
      </div>
      {cartItems.map((cartItem) => (
        <CheckoutItem key={cartItem.id} item={cartItem} />
      ))}
      <div className='total'>
        <span>Total: {total}</span>
      </div>
    </div>
  );
}

export default CheckoutPage;
