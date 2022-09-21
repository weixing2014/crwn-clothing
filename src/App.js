import React, { useContext, useEffect } from 'react';
import './App.css';
import { Redirect, Route, Switch } from 'react-router-dom';
import HomePage from './pages/Homepage/Homepage.component';
import ShopPage from './pages/Shop/Shop.component';
import Header from './components/Header/header.component';
import SignInAndSignUpPage from './pages/SignInAndSignUp/SignInAndSignUp.component';
import { auth, getOrCreateUserProfileDocument } from './firebase/firebase.utils';
import CheckoutPage from './pages/Checkout/Checkout.component';
import { UserContext } from './context/user.context';

const App = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  let unsubscribeFromAuth = null;

  useEffect(() => {
    unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await getOrCreateUserProfileDocument(userAuth);

        userRef.onSnapshot((snapshot) => {
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data(),
          });
        });
      } else {
        setCurrentUser(userAuth);
      }
    });

    return () => unsubscribeFromAuth();
  }, []);

  return (
    <div className='App'>
      <Header />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/shop' component={ShopPage} />
        <Route exact path='/checkout' component={CheckoutPage} />
        <Route
          exact
          path='/signin'
          render={() =>
            currentUser ? (
              <Redirect to='/' />
            ) : (
              <SignInAndSignUpPage />
            )
          }
        />
      </Switch>
    </div>
  );
};

export default App;
