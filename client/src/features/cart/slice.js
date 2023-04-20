import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    deliveryOption: 'collection',
  },
  reducers: {
    addToCart(state, action) {
      state.items.push(action.payload);
    },
    removeFromCart(state, action) {
      state.items = state.items.filter(product => product.id !== action.payload);
    },
    setDeliveryOption(state, action) {
      state.deliveryOption = action.payload;
    },
  },
});

export const { addToCart, removeFromCart, setDeliveryOption } = cartSlice.actions;

export default cartSlice.reducer;