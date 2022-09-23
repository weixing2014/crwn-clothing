import React, { useContext } from 'react';
import './CartDropdown.component.scss';
import CustomButton from '../CustomButton/CustomButton.component';
import { withRouter } from 'react-router-dom';
import CartItem from '../CartItem/CartItem.component';
import { CartContext } from '../../context/cart.context';

function CartDropdown({ history }) {
  const { cartItems, setIsCartOpen, isCartOpen } = useContext(CartContext)
  return (
    <div className="cart-dropdown">
      <div className="cart-items">
        {cartItems.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
      <CustomButton
        onClick={() => {
          setIsCartOpen(!isCartOpen);
          history.push('/checkout');
        }}
      >
        GO TO CHECKOUT
      </CustomButton>
    </div>
  );
}

export default withRouter(CartDropdown);
