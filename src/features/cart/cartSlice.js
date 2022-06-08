import { createSlice } from "@reduxjs/toolkit";
import cartItems from "../../cartItems";

const initialState = {
  cartItems: cartItems,
  amount: 1,
  total: 0,
  isLoading: true,
};

const cartSlite = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
    },
    toggle: (state, { payload }) => {
      const { id, act } = payload;
      const cartItem = state.cartItems.find((item) => item.id === id);
      switch (act) {
        case "INCREASE":
          cartItem.amount++;
          break;
        case "DECREASE":
          if (cartItem.amount <= 0) {
            console.warn("Can't decrease amount");
            break;
          }
          cartItem.amount--;
          break;
        default:
          break;
      }
    },
  },
});

export const { clearCart, removeItem, toggle } = cartSlite.actions;
// console.log(cartSlite);

export default cartSlite.reducer;
