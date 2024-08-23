import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  Product: [],
  oneproduct: [],
  Promotion: [],
  productVariation: [],

};

const ProductSlice = createSlice({
  name: "Product",
  initialState,
  reducers: {
    ProductRequest: (state, action) => {
      state.loading = true;
      state.error = null;
      // state.Product = null;
      state.count = null;
    },
    ProductSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.Product = action.payload;
      state.count = action.payload.length;
    },

    ProductFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      // state.Product = null;
      state.count = null;
    },
    PromotionRequest: (state, action) => {
      state.loading = true;
      state.error = null;
      state.Promotion = null;
    },
    PromotionSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.Promotion = action.payload;
    },

    PromotionFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.Promotion = null;
    },

    oneproductRequest: (state, action) => {
      state.loading = true;
      state.error = null;
      state.oneproduct = null;
    },
    oneproductSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.oneproduct = action.payload;
    },

    oneproductFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.oneproduct = null;
    },
    productVariationRequest: (state, action) => {
      state.loading = true;
      state.error = null;
      state.productVariation = null;
    },
    productVariationSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.productVariation = action.payload;
    },

    productVariationFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.productVariation = null;
    },
  
  
  },
});

export const ProductAction = ProductSlice.actions;
export default ProductSlice;
