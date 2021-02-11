import React from 'react'
import '../styles/Checkout.css';
import Subtotal from './Subtotal';
import CheckoutProduct from './CheckoutProduct';
import { selectBasket } from '../features/basketSlice';
import { selectUser } from '../features/userSlice';
import { useSelector } from 'react-redux';

function Checkout() {
  const user = useSelector(selectUser);
  const basket = useSelector(selectBasket);

  return (
    <div className='checkout'>
      <div className='checkout-left'>
        <img
          className="checkout-ad"
          src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
          alt=""
        />

        <div>
          <h3>Hello, {user?.email}</h3>
          <h2 className='checkout-title'>Your Shopping Basket</h2>
          {basket.map(item => (
            <CheckoutProduct 
              id={item.id}
              title={item.title}
              image={item.image}
              price={item.price}
              rating={item.rating}
            />
          ))}
        </div>
      </div>

      <div className='checkout-right'>
        <Subtotal />
      </div>

    </div>
  )
}

export default Checkout
