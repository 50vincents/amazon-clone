import React from 'react'
import '../styles/Subtotal.css';
import CurrencyFormat from 'react-currency-format';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectBasket, getBasketTotal } from '../features/basketSlice';

function Subtotal() {
  const history = useHistory();
  const basket = useSelector(selectBasket);
  const totalBasket = useSelector(getBasketTotal);

  const redirect = (e) => {
    history.push('/payment')
  }

  return (
    <div className='subtotal'>
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal ({basket.length} items): <strong>{value}</strong> 
            </p>
            <small className="subtotal-gift">
              <input type="checkbox" /> This order contains a gift
            </small>
          </>
        )}
        decimalScale={2} // decimal places
        value={totalBasket} // subtotal sum, gets passed back in above
        displayType={"text"}
        thousandSeparator={true} // comma separator
        prefix={"$"} // USD
      />

      <button onClick={redirect}>Proceed to Checkout</button>
    </div>
  )
}

export default Subtotal
// show number of items and sum total