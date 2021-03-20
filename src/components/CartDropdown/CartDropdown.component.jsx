import React from 'react';
import './CartDropdown.component.scss';
import CustomButton from '../CustomButton/CustomButton.component';
import { connect } from 'react-redux';
import CartItem from '../CartItem/CartItem.component';

function CartDropdown({ cartItems }) {
  return (
    <div className="cart-dropdown">
      <div className="cart-items">
        {cartItems.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
      <CustomButton>GO TO CHECKOUT</CustomButton>
    </div>
  );
}

export default connect(
  (state) => ({ cartItems: state.cart.cartItems }),
  null,
)(CartDropdown);
