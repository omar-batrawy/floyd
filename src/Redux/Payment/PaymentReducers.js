import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  Payment: [],
  subPayment:[]

};

const PaymentSlice = createSlice({
  name: "Payment",
  initialState,
  reducers: {
    PaymentRequest: (state, action) => {
      state.loading = true;
      state.error = null;
      state.Payment = null;
    },
    PaymentSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.Payment = action.payload;
    },

    PaymentFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.Payment = null;
    },

    subPaymentRequest: (state, action) => {
      state.loading = true;
      state.error = null;
      state.subPayment = null;
    },
    subPaymentSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.subPayment = action.payload;
    },

    subPaymentFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.subPayment = null;
    },

  
  },
});

export const PaymentAction = PaymentSlice.actions;
export default PaymentSlice;
