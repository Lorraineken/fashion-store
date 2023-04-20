import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './features/products/slice';
import userReducer from './features/users/slice'
import ordersReducer from './features/orders/slice'
import reviewsReducer from './features/reviews/slice'

const store = configureStore({
  reducer: {
    products: productsReducer,
    users: userReducer,
    orders: ordersReducer,
    reviews: reviewsReducer,
  },
});

export default store;