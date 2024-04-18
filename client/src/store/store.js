import { configureStore } from "@reduxjs/toolkit";
import Products from "../redux/products/index.js";

export const store = configureStore({
  reducer: {
    products: Products,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check middleware
    }),
});
