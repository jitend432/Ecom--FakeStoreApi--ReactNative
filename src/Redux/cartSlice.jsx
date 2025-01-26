import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: {},  // Stores product ID & quantity
  totalCount: 0, // Tracks total items in cart
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const productId = action.payload;
      if (state.items[productId]) {
        state.items[productId] += 1;
      } else {
        state.items[productId] = 1;
      }
      state.totalCount += 1;
    },
    removeItem: (state, action) => {
      const productId = action.payload;
      if (state.items[productId]) {
        state.items[productId] -= 1;
        state.totalCount -= 1;
        if (state.items[productId] === 0) {
          delete state.items[productId];
        }
      }
    },
  },
});

export const { addItem, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
