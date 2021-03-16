import React from 'react';
import { connect } from 'react-redux';
import './header.styles.scss';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/crown.svg';
import { auth } from '../../firebase/firebase.utils';
import CartIcon from '../CartIcon/CartIcon.component';
import CartDropdown from '../CartDropdown/CartDropdown.component';
import { setCurrentUser } from '../../redux/user/user.actions';
import { toggleCartVisibility } from '../../redux/cart/cart.actions';

function Header({ currentUser, isCartVisible, toggleCartVisibility }) {
  return (
    <div className="header">
      <Link className="logo-container" to="/">
        <Logo className="logo" />
      </Link>
      <div className="options">
        <Link className="option" to="/shop">
          SHOP
        </Link>
        {currentUser ? (
          <>
            <div className="option" onClick={() => auth.signOut()}>
              SIGN OUT
            </div>
            <div className="option" onClick={toggleCartVisibility}>
              <CartIcon />
            </div>
          </>
        ) : (
          <Link className="option" to="/signin">
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
    currentUser: appState.user.currentUser,
    isCartVisible: appState.cart.display,
  }),
  {
    toggleCartVisibility,
  },
)(Header);
