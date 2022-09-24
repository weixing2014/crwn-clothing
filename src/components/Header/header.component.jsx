import React, { useContext } from 'react';
import { connect } from 'react-redux';
import './header.styles.scss';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/homemade-food.svg';
import { auth } from '../../firebase/firebase.utils';
import CartIcon from '../CartIcon/CartIcon.component';
import CartDropdown from '../CartDropdown/CartDropdown.component';
import { toggleCartVisibility } from '../../redux/cart/cart.actions';
import { selectCurrentUser } from '../../redux/user/user.selector';
import { selectCartVisibility } from '../../redux/cart/cart.selector';
import { UserContext } from '../../context/user.context';
import { CartContext } from '../../context/cart.context';

function Header() {
  const { currentUser: user } = useContext(UserContext);
  const { isCartOpen, setIsCartOpen } = useContext(CartContext);
  const toggleCartVisibility = () => setIsCartOpen(!isCartOpen);

  return (
    <div className='header'>
      <div className='logo-and-name'>
        <Link className='logo-container' to='/'>
          <Logo className='logo' />
        </Link>
        <div>Nolan Foody</div>
      </div>
      <div className='options'>
        <Link className='option' to='/shop'>
          SHOP
        </Link>
        {user ? (
          <>
            {user.email}
            <div className='option' onClick={() => auth.signOut()}>
              SIGN OUT
            </div>
            <div className='option' onClick={toggleCartVisibility}>
              <CartIcon />
            </div>
          </>
        ) : (
          <Link className='option' to='/signin'>
            SIGN IN
          </Link>
        )}
        {isCartOpen ? <CartDropdown /> : null}
      </div>
    </div>
  );
}

export default Header;
