import React from 'react'
import '../styles/Subtotal.css';
import CurrencyFormat from 'react-currency-format';
import { useStateValue } from '../react-context/StateProvider';
import { getBasketTotal } from '../react-context/reducer';
import { useHistory } from 'react-router-dom';

function Subtotal() {
  const history = useHistory();
  const [{ basket }, dispatch] = useStateValue();

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
        value={getBasketTotal(basket)} // subtotal sum, gets passed back in above
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