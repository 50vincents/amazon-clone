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
import { useStateValue } from './react-context/StateProvider';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, useElements } from '@stripe/react-stripe-js';

const promise = loadStripe(
  'pk_test_51HRMKQL221fWhTuXVgeUVNyK3i520jAJ4vxQUHGhqauPseJ6pW8mAOAI5hNIgjODASqo0oDVjbk4a1oQ8pVn4ze900y275W54m'
);

function App() {
  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    // only run once when app component loads... dynamic if statement
    auth.onAuthStateChanged(authUser => {
      console.log('user is', authUser);

      if (authUser) {
        // user just logged in/was logged in
        dispatch({
          type: 'SET_USER',
          user: authUser
        })
      } else {
        // user is logged out
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }
    })
  }, [])

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
