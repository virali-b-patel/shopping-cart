import { BrowserRouter, Route } from 'react-router-dom/cjs/react-router-dom.min';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Cart from './components/Cart';

function App() {
  return (
    <BrowserRouter>
      <Header />
      {/* <img src="https://source.unsplash.com/random/?Cryptocurrency/" alt="crypto"/> */}

      <div>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/cart" exact>
          <Cart />
        </Route>
      </div>
    </BrowserRouter>
  );
}

export default App;
