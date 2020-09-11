import React from 'react'
import '../styles/Subtotal.css';
import CurrencyFormat from 'react-currency-format';

function Subtotal() {
  return (
    <div className='subtotal'>
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal (0 items): <strong>0</strong>
            </p>
            <small className="subtotal-gift">
              <input type="checkbox" /> This order contains a gift
            </small>
          </>
        )}
        decimalScale={2} // decimal places
        value={0} // subtotal sum
        displayType={"text"}
        thousandSeparator={true} // comma separator
        prefix={"$"} // USD
      />

      <button>Proceed to Checkout</button>
    </div>
  )
}

export default Subtotal
