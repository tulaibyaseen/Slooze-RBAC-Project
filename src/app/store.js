import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import themeReducer from "./features/themeSlice";
import productsReducer from "./features/productsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    products: productsReducer,
  },
});
