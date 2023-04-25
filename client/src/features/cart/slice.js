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
      console.log('removeFromCart reducer called with action:', action);
      state.items = state.items.filter(product => product.id !== action.payload);
    },
    setDeliveryOption(state, action) {
      state.deliveryOption = action.payload;
    },
    updateItemQuantity(state, action) {
      console.log('update action:', action);
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);
      if (item) {
        item.quantity = quantity;
      }
      console.log('updateItemQuantity reducer returned state:', state);
    },
  },
});

export const { addToCart, removeFromCart, setDeliveryOption,updateItemQuantity } = cartSlice.actions;

export default cartSlice.reducer;