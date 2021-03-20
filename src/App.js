import './App.css';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import HomePage from './pages/Homepage/Homepage.component';
import ShopPage from './pages/Shop/Shop.component';
import Header from './components/Header/header.component';
import SignInAndSignUpPage from './pages/SignInAndSignUp/SignInAndSignUp.component';
import {
  auth,
  getOrCreateUserProfileDocument,
} from './firebase/firebase.utils';
import { Component } from 'react';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selector';
import CheckOutPage from "./pages/CheckOut/CheckOut.component";

class App extends Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    // Pass in a callback function to auth.onAuthStateChanged
    // So whenever the auth state changes the function will be triggered

    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await getOrCreateUserProfileDocument(userAuth);

        // Listen to the user document mutations
        userRef.onSnapshot((snapshot) => {
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data(),
          });
        });
      } else {
        // Log out
        setCurrentUser(userAuth);
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/shop" component={ShopPage} />
          <Route exact path="/checkout" component={CheckOutPage} />
          <Route
            exact
            path="/signin"
            render={() =>
              this.props.currentUser ? (
                <Redirect to="/" />
              ) : (
                <SignInAndSignUpPage />
              )
            }
          />
        </Switch>
      </div>
    );
  }
}

export default connect(
  (appState) => ({
    currentUser: selectCurrentUser(appState),
  }),
  {
    setCurrentUser,
  },
)(withRouter(App));
