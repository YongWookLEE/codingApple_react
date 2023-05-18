import { configureStore, createSlice } from "@reduxjs/toolkit";
import user from "./userSlice";
import cart from "./cartSlice";

export default configureStore({
  reducer: {
    cart: cart.reducer,
    user: user.reducer,
  },
});
