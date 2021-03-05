import './App.css';
import { Switch, Route, Link } from 'react-router-dom';
import HomePage from './pages/homepage/Homepage.component';

export function HatsPage(props) {
  return <div>HATS PAGE</div>;
}

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/shop/hats" component={HatsPage} />
      </Switch>
    </div>
  );
}

export default App;
