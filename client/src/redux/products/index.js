import { createSlice } from "@reduxjs/toolkit";

const Products = createSlice({
  name: "products",
  initialState: {
    Fashion: [],
    Electronics: [],
    Furniture: [],
    ProductInfo: [],
  },

  reducers: {
    updateFashion: (state, action) => {
      state.Fashion = action.payload;
    },
    updateElectronics: (state, action) => {
      state.Electronics = action.payload;
    },
    updateFurniture: (state, action) => {
      state.Furniture = action.payload;
    },
    updateProductInfo: (state, action) => {
      state.ProductInfo = action.payload;
    },
  },
});

export const {
  updateFashion,
  updateElectronics,
  updateFurniture,
  updateProductInfo,
} = Products.actions;

export default Products.reducer;
