import React, { useState, useEffect } from 'react'
import { useStateValue } from '../react-context/StateProvider';
import '../styles/Payment.css';
import CheckoutProduct from './CheckoutProduct';
import { Link, useHistory } from 'react-router-dom';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from '../react-context/reducer';
import axios from '../axios';
import { db } from '../firebase';

function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();
  const history = useHistory();

  const stripe = useStripe();
  const elements = useElements();

  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState('');
  const [clientSecret, setClientSecret] = useState(true)

  // Run when payment component loads or bracket var changes
  useEffect(() => {
    // Generate the special stripe secret which allows us to charge a customer
    const getClientSecret = async () => {
      const response = await axios({
        method: 'post',
        // Stripe expects total in a currencies subunits
        url: `/payments/create?total=${getBasketTotal(basket) * 100}`
      });
      // Have payment to send to stripe, get client secret
      setClientSecret(response.data.clientSecret)
    }

    getClientSecret();
  }, [basket]) // Every time basket changes in payment page, new req sent to stripe with new client secret


  const handleSubmit = async(event) => {
    // Stripe processing
    event.preventDefault();
    setProcessing(true);

    // Client secret is how much we know to charge customer
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement) // Find card
      }
    }).then(({ paymentIntent }) => {
      // Payment intent is payment confirmation

      db
        .collection('users')
        .doc(user?.uid)
        .collection('orders')
        .doc(paymentIntent.id)
        .set({
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created
        })

      setSucceeded(true);
      setError(null);
      setProcessing(false);

      dispatch({
        type: 'EMPTY_BASKET'
      })

      history.replace('/orders'); // Swap payment page, don't want to go back so no push
    })
  }

  const handleChange = e => {
    // Listen for changes in CardElement
    // display any errors as customer types their card details
    setDisabled(e.empty);
    setError(e.error ? e.error.message : '');
  }

  return (
    <div className='payment'>
      <div className='payment-container'>
        <h1>
          Checkout (<Link to='/checkout'>{basket?.length} items</Link>)
        </h1>

        <div className='payment-section'>
          <div className='payment-title'>
            <h3>Delivery Address</h3>
          </div>
          <div className='payment-address'>
            <p>{user?.email}</p>
            <p>Addresss</p>
            <p>City</p>
          </div>
        </div>

        <div className='payment-section'>
          <div className='payment-title'>
            <h3>Review Items and Delivery</h3>
          </div>
          <div className='payment-items'>
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

        <div className='payment-section'>
          <div className='payment-title'>
            <h3>Payment Method</h3>
          </div>
          <div className='payment-details'>
              <form onSubmit={handleSubmit}>
                <CardElement onChange={handleChange}/>

                <div className='payment-priceContainer'>
                  <CurrencyFormat
                    renderText={(value) => (
                      <h3>Order Total: {value}</h3>                     
                    )}
                    decimalScale={2} // decimal places
                    value={getBasketTotal(basket)} // subtotal sum, gets passed back in above
                    displayType={"text"}
                    thousandSeparator={true} // comma separator
                    prefix={"$"} // USD
                  />

                  <button disabled={processing || disabled || succeeded}>
                    <span>{processing ? <p>Processing</p> : 'Buy Now'}</span>
                  </button>

                </div>

                {error && <div>{error}</div>}

              </form>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Payment
