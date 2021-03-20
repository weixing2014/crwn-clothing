import React from 'react';
import './CartDropdown.component.scss';
import CustomButton from '../CustomButton/CustomButton.component';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import CartItem from '../CartItem/CartItem.component';
import { toggleCartVisibility } from '../../redux/cart/cart.actions';

function CartDropdown({ cartItems, history, toggleCartVisibility }) {
  return (
    <div className="cart-dropdown">
      <div className="cart-items">
        {cartItems.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
      <CustomButton
        onClick={() => {
          toggleCartVisibility();
          history.push('/checkout');
        }}
      >
        GO TO CHECKOUT
      </CustomButton>
    </div>
  );
}

export default withRouter(
  connect((state) => ({ cartItems: state.cart.cartItems }), {
    toggleCartVisibility,
  })(CartDropdown),
);
