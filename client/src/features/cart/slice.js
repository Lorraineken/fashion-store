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
    updateItemQuantity(state, action) {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);
      if (item) {
        item.quantity = quantity;
      }
    },
  },
});

export const { addToCart, removeFromCart, setDeliveryOption,updateItemQuantity } = cartSlice.actions;

export default cartSlice.reducer;