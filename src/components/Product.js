import React from 'react'
import '../styles/Product.css';
import { useDispatch } from 'react-redux';
import { addToBasket } from '../features/basketSlice';

function Product({ id, title, image, price, rating }) {
  const dispatch = useDispatch();

  const addBasket = () => {
    // Dispatch item to data layer
    dispatch(
      addToBasket({
        id: id,
        title: title,
        image: image,
        price: price,
        rating: rating,
      })
    );
  };

  return (
    <div className='product'>
        <div className='product-info'>
          <p>{title}</p>

          <p className='product-price'>
            <small>$</small>
            <strong>{price}</strong>
          </p>

          <div className='product-rating'>
            {Array(rating)
              .fill()
              .map((_, i) => (
                <p>🌟</p>
              ))}
          </div>
          
        </div>

        <img src={image} alt="" />
        <button onClick={addBasket}>Add to Basket</button>
    </div>
  )
}

export default Product
