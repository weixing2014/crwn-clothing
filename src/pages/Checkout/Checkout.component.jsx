import React from 'react';

import './Checkout.component.scss';
import { connect } from 'react-redux';
import {
  selectCartItems,
  selectCartTotal,
} from '../../redux/cart/cart.selector';
import CheckoutItem from '../../components/CheckoutItem/CheckoutItem.component';

function CheckoutPage({ cartItems, total }) {
  return (
    <div className="checkout-page">
      <div className="checkout-header">
        <div className="header-block">
          <span>Product</span>
        </div>
        <div className="header-block">
          <span>Description</span>
        </div>
        <div className="header-block">
          <span>Quantity</span>
        </div>
        <div className="header-block">
          <span>Price</span>
        </div>
      </div>
      {cartItems.map((cartItem) => (
        <CheckoutItem key={cartItem.id} item={cartItem} />
      ))}
      <div className="total">
        <span>Total: {total}</span>
      </div>
    </div>
  );
}

export default connect(
  (appState) => ({
    total: selectCartTotal(appState),
    cartItems: selectCartItems(appState),
  }),
  null,
)(CheckoutPage);
