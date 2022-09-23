import React, { useContext } from 'react';

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import './CartIcon.component.scss';
import { CartContext } from '../../context/cart.context';
import { getSelectItemCount } from '../../redux/cart/cart.utils';

function CartIcon() {
  const { cartItems } = useContext(CartContext);

  return (
    <div className="cart-icon">
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">{getSelectItemCount(cartItems)}</span>
    </div>
  );
}

export default CartIcon;
