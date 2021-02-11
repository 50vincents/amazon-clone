import React, { useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Checkout from './components/Checkout';
import Login from './components/Login';
import Payment from './components/Payment';
import Orders from './components/Orders';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { auth } from './firebase';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { login, logout } from './features/userSlice';
import { useDispatch } from 'react-redux';

const promise = loadStripe(
  "pk_test_51IJTUkDLRmlo2iYv745IwmovVzJ5chWXCZ0PK0CfOC8UXbcs0KvOtM60cThtWgxiWZ34oWr6O5QbrJYwhW3y6OOO00ntDFn7qn"
);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // only run once when app component loads... dynamic if statement
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // user just logged in/was logged in
        dispatch(
          login(authUser)
        );
      } else {
        // user is logged out
        dispatch(logout());
      }
    });

  }, [dispatch])

  return (
    <Router>
      <div className="App">        
        <Switch>
          <Route path='/orders'>
            <Header />
            <Orders />
          </Route>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/checkout'>
            <Header />
            <Checkout />
          </Route>
          <Route path='/payment'>
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>
          <Route path='/'>
            <Header />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
