import React from 'react'
import '../styles/Header.css';
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { Link } from 'react-router-dom';
import { useStateValue } from '../react-context/StateProvider';

function Header() {
  const [{ basket }, dispatch] = useStateValue();
  return (
    <div className='header'>
      <Link to='/'>
        <img 
          className='header-logo'
          src='http://pngimg.com/uploads/amazon/amazon_PNG11.png' 
        />
      </Link>

      <div className='header-search'>
        <input 
          className='header-searchInput'
          type='text' 
        />
        <SearchIcon className='header-searchIcon' />
      </div>

      <div className='header-nav'>
        <Link to='/login'>
          <div className='header-option'>
            <span className='header-option-one'>Hello Guest</span>
              <span className='header-option-two'>Sign In</span>
          </div>
        </Link>

        <div className='header-option'>
          <span className='header-option-one'>Returns</span>
          <span className='header-option-two'>& Orders</span>
        </div>
        
        <div className='header-option'>
          <span className='header-option-one'>Your</span>
          <span className='header-option-two'>Prime</span>
        </div>

        <Link to='/checkout'>
          <div className='header-optionBasket'>
            <ShoppingBasketIcon />
            <span className='header-option-two header-basketCount'>{basket?.length}</span>
          </div>
        </Link>
        
      </div>

    </div>
  )
}

export default Header
