// Dispatch actions to data layer
// Push data to data layer

export const initialState = {
  basket: [], 
};

const reducer = (state, action) => {
  switch(action.type) {
    case 'ADD_TO_BASKET':
      return {
        ...state,
        basket: [...state.basket, action.item], // state of basket before and new item
      };
    default:
      return state
  }
};

export default reducer;