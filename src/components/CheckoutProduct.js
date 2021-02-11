import React from 'react'
import '../styles/CheckoutProduct.css'
import { useDispatch } from 'react-redux';
import { removeFromBasket } from '../features/basketSlice';

function CheckoutProduct({ id, image, title, price, rating, hideButton }) {
  const dispatch = useDispatch();

  const removeBasket = () => {
    dispatch(
      removeFromBasket({id: id})
    );
  };

  return (
    <div className='checkoutProduct'>
      <img className='checkoutProduct-image' src={image} />

      <div className='checkoutProduct-info'>
        <p className='checkoutProduct-title'>{title}</p>

        <p className='checkoutProduct-price'>
          <small>$</small>
          <strong>{price}</strong>
        </p>

        <div className='checkoutProduct-rating'>
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p>🌟</p>
            ))}
        </div>
        {!hideButton && (
          <button onClick={removeBasket}>Remove From Basket</button>
        )}
      </div>
    </div>
  )
}

export default CheckoutProduct

