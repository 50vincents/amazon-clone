import React, { useState } from 'react'
import '../styles/Login.css'
import { Link, useHistory } from 'react-router-dom';
import { useStateValue } from '../react-context/StateProvider';
import { auth } from '../firebase';

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signIn = (e) => {
    e.preventDefault(); // prevent refresh

      auth
        .signInWithEmailAndPassword(email, password)
        .then(auth => {
          history.push('/')
        })
        .catch(err => alert(err.message))
  }

  const register = (e) => {
    e.preventDefault();

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        // Successfully created new user w email and pass
        if (auth) {
          history.push('/') // Redirect to home page
        }
      })
      .catch(err => alert(err.message))
  }

  return (
    <div className='login'>
      <Link to='/'>
        <img
          className="login-logo"
          src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png' 
        />
      </Link>
      
      <div className='login-container'>
        <h1>Sign In</h1>
        <form>
          <h5>Email</h5>
          <input 
            type='text' 
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          <h5>Password</h5>
          <input 
            type='password' 
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          <button onClick={signIn} className='login-signInButton'>Sign In</button>
        </form>

        <p>
          By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use & Sale. Please
          see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.
        </p>

        <button onClick={register} className='login-registerButton'>Create Your Amazon Account</button>
      </div>

    </div>
  )
}

export default Login
