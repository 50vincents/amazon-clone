import React, { useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Checkout from './components/Checkout';
import Login from './components/Login';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { auth } from './firebase';
import { useStateValue } from './react-context/StateProvider';

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
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/checkout'>
            <Header />
            <Checkout />
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
