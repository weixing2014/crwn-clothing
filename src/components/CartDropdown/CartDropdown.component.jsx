import React from 'react';
import './CartDropdown.component.scss';
import CustomButton from '../CustomButton/CustomButton.component';

export default function Cart() {
  return (
    <div className="cart-dropdown">
      <div className="cart-items" />
      <CustomButton>GO TO CHECKOUT</CustomButton>
    </div>
  );
}
