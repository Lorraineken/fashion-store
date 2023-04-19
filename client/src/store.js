import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './features/products/slice';
import userReducer from './features/users/slice'
import ordersReducer from './features/orders/slice'

const store = configureStore({
  reducer: {
    products: productsReducer,
    users: userReducer,
    orders: ordersReducer,
  },
});

export default store;