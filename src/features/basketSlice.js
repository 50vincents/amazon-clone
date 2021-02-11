import { createSlice } from '@reduxjs/toolkit';

export const basketSlice = createSlice({
  name: 'basket',
  initialState: {
    basket: [],
  },
  // actions that are dispatched, affects user section of store
  // push into store
  reducers: {
    addToBasket: (state, action) => {
      state.basket = [...state.basket, action.payload];
    },
    removeFromBasket: (state, action) => {
      const index = state.basket.findIndex(
        (basketItem) => basketItem.id === action.payload.id
      );
      let newBasket = [...state.basket];
      
      if (index >= 0) {
        newBasket.splice(index, 1) // cuts out item and return new array
      } else {
        console.warn(`Product ${action.payload.id} is not in basket`);
      }

      state.basket = newBasket;
    },
    emptyBasket: (state) => {
      state.basket = [];
    }
  },
});

export const { addToBasket, removeFromBasket, emptyBasket } = basketSlice.actions;


export const selectBasket = (state) => state.basket.basket;

// iterate thru basket and tally total
// add item price to amount, initial value is 0
export const getBasketTotal = (state) => state.basket.basket?.reduce((amount, item) => item.price + amount, 0);


export default basketSlice.reducer;