import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  Order: [],
  addOrder : []

};

const OrderSlice = createSlice({
  name: "Order",
  initialState,
  reducers: {
    OrderRequest: (state, action) => {
      state.loading = true;
      state.error = null;
      state.Order = null;
    },
    OrderSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.Order = action.payload;
    },

    OrderFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.Order = null;
    },

    
    addOrderRequest: (state, action) => {
      state.loading = true;
      state.error = null;
      state.addOrder = null;
    },
    addOrderSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.addOrder = action.payload;
    },

    addOrderFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.addOrder = null;
    },
  },
});

export const OrderAction = OrderSlice.actions;
export default OrderSlice;
