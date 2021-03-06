import './App.css';
import { Switch, Route, Link } from 'react-router-dom';
import HomePage from './pages/homepage/Homepage.component';
import ShopPage from './pages/shop/Shop.component';

export function HatsPage(props) {
  return <div>HATS PAGE</div>;
}

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/shop" component={ShopPage} />
      </Switch>
    </div>
  );
}

export default App;
