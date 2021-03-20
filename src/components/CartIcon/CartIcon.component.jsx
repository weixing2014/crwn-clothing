import React from 'react';

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import './CartIcon.component.scss';
import { connect } from 'react-redux';
import { selectCartItemsCount } from '../../redux/cart/cart.selector';

function CartIcon({ itemCount }) {
  console.log(itemCount);
  return (
    <div className="cart-icon">
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">{itemCount}</span>
    </div>
  );
}

export default connect(
  (state) => ({
    itemCount: selectCartItemsCount(state),
  }),
  null,
)(CartIcon);
