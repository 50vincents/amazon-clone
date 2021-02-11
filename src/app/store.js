import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import basketReducer from '../features/basketSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    basket: basketReducer
  },
});