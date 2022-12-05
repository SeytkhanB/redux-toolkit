import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = "https://course-api.com/react-useReducer-cart-project";

const initialState = {
  cartItems: [],
  amount: 0,
  total: 0,
  isLoading: false,
  isError: false,
};

export const getCartItems = createAsyncThunk(
  "cart/getCartItems",
  async (thunkAPI) => {
    // console.log(thunkAPI.getState()) <-- we have access to both state! this is really powerful
    try {
      const { data } = await axios(url);
      return data;
    } catch (error) {
      throw new Error("Something went wrong!");
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },

    removeItem: (state, { payload }) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== payload.id
      );
    },

    increase: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id);
      cartItem.amount += 1;
    },

    decrease: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id);
      cartItem.amount -= 1;
    },

    calculateTotals: (state) => {
      let amount = 0;
      let total = 0;
      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.amount * item.price;
      });
      state.amount = amount;
      state.total = total.toFixed(2);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getCartItems.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload;
        state.isError = false;
      })
      .addCase(getCartItems.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { clearCart, removeItem, increase, decrease, calculateTotals } =
  cartSlice.actions;
export default cartSlice.reducer;
