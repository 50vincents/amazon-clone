// Dispatch actions to data layer
// Push data to data layer

export const initialState = {
  basket: [], 
};

// Selector - take basket, reduce it down inside a function
export const getBasketTotal = (basket) =>
// iterate thru basket and tally total
// add item price to amount, initial value is 0
  basket?.reduce((amount, item) => item.price + amount, 0);

const reducer = (state, action) => {
  switch(action.type) {
    case 'ADD_TO_BASKET':
      return {
        ...state,
        basket: [...state.basket, action.item], // state of basket before and new item
      };

    case 'REMOVE_FROM_BASKET':
      const index = state.basket.findIndex(
        (basketItem) => basketItem.id === action.id
      );
      let newBasket = [...state.basket];
      
      if (index >= 0) {
        newBasket.splice(index, 1) // cuts out item and return new array
      } else {
        console.warn(`Product ${action.id} is not in basket`);
      }

      return {
        ...state,
        basket: newBasket
      };

    default:
      return state
  }
};

export default reducer;