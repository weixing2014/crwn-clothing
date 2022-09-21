import React, { useContext } from 'react';
import { connect } from 'react-redux';
import './header.styles.scss';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/crown.svg';
import { auth } from '../../firebase/firebase.utils';
import CartIcon from '../CartIcon/CartIcon.component';
import CartDropdown from '../CartDropdown/CartDropdown.component';
import { toggleCartVisibility } from '../../redux/cart/cart.actions';
import { selectCurrentUser } from '../../redux/user/user.selector';
import { selectCartVisibility } from '../../redux/cart/cart.selector';
import { UserContext } from '../../context/user.context';

function Header({ currentUser, isCartVisible, toggleCartVisibility }) {
  const { currentUser: user } = useContext(UserContext);

  return (
    <div className='header'>
      <Link className='logo-container' to='/'>
        <Logo className='logo' />
      </Link>
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
        {isCartVisible ? <CartDropdown /> : null}
      </div>
    </div>
  );
}

export default connect(
  (appState) => ({
    currentUser: selectCurrentUser(appState),
    isCartVisible: selectCartVisibility(appState),
  }),
  {
    toggleCartVisibility,
  },
)(Header);
