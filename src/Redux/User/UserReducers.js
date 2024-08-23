import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  Login: [],
  getotp: [],
  Checkjwt: [],
  ResetPassword: [],
  alldistrict: [],
  Adduser: [],
  costumer: [],
  whishlist :[],
  Addwhishlist :[],
  removefromwhishlist :[],
  whishlistLoading : false,
  shippinfo : [],
  Addshippinfo : [],
  removeshippinfo : [],

  
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginRequest: (state, action) => {
      state.loading = true;
      state.error = null;
      state.Login = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.Login = action.payload;
    },

    loginFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.Login = null;
    },
    getotpRequest: (state, action) => {
      state.loading = true;
      state.error = null;
      state.getotp = null;
    },
    getotpSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.getotp = action.payload;
    },

    getotpFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.getotp = null;
    },
    CheckjwtRequest: (state, action) => {
      state.loading = true;
      state.error = null;
      state.Checkjwt = null;
    },
    CheckjwtSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.Checkjwt = action.payload;
    },

    CheckjwtFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.Checkjwt = null;
    },
    ResetPasswordRequest: (state, action) => {
      state.loading = true;
      state.error = null;
      state.ResetPassword = null;
    },
    ResetPasswordSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.ResetPassword = action.payload;
    },

    ResetPasswordFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.ResetPassword = null;
    },
    costumerRequest: (state, action) => {
      state.loading = true;
      state.error = null;
      state.costumer = null;
    },
    costumerSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.costumer = action.payload;
    },

    costumerFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.costumer = null;
    },

   
    AdduserRequest: (state, action) => {
      state.loading = true;
      state.error = null;
      state.Adduser = null;
    },
    AdduserSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.Adduser = action.payload;
    },

    AdduserFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.Adduser = null;
    },

    whishlistRequest: (state, action) => {
      state.error = null;
      // state.whishlist = null;
      state.whishlistLoading = true;
    },
    whishlistSuccess: (state, action) => {
      state.error = null;
      state.whishlist = action.payload;
      state.whishlistLoading = false;

    },

    whishlistFail: (state, action) => {
      state.error = action.payload;
      state.whishlist = null;
      state.whishlistLoading = false;

    },

    AddwhishlistRequest: (state, action) => {
      state.error = null;
      state.Addwhishlist = null;
    },
    AddwhishlistSuccess: (state, action) => {
      state.error = null;
      state.Addwhishlist = action.payload;
    },

    AddwhishlistFail: (state, action) => {
      state.error = action.payload;
      state.Addwhishlist = null;
    },
    removefromwhishlistRequest: (state, action) => {
      state.error = null;
      state.removefromwhishlist = null;
    },
    removefromwhishlistSuccess: (state, action) => {
      state.error = null;
      state.removefromwhishlist = action.payload;
    },

    removefromwhishlistFail: (state, action) => {
      state.error = action.payload;
      state.removefromwhishlist = null;
    },

    // shippinfoRequest: (state, action) => {
    //   state.error = null;
    //   // state.shippinfo = null;
    // },
    // shippinfoSuccess: (state, action) => {
    //   state.error = null;
    //   state.shippinfo = action.payload;
    // },

    // shippinfoFail: (state, action) => {
    //   state.error = action.payload;
    //   // state.shippinfo = null;
    // },

    shippinfoRequest: (state, action) => {
      state.error = null;
      // state.shippinfo = null;
      state.loading = true;
    },
    shippinfoSuccess: (state, action) => {
      state.error = null;
      state.shippinfo = action.payload;
      state.loading = false;
    },

    shippinfoFail: (state, action) => {
      state.error = action.payload;
      state.shippinfo = null;
      state.loading = false;
    },

    AddshippinfoRequest: (state, action) => {
      state.error = null;
      state.Addshippinfo = null;
    },
    AddshippinfoSuccess: (state, action) => {
      state.error = null;
      state.Addshippinfo = action.payload;
    },

    AddshippinfoFail: (state, action) => {
      state.error = action.payload;
      state.Addshippinfo = null;
    },
    removeshippinfoRequest: (state, action) => {
      state.error = null;
      state.removeshippinfo = null;
    },
    removeshippinfoSuccess: (state, action) => {
      state.error = null;
      state.removeshippinfo = action.payload;
    },

    removeshippinfoFail: (state, action) => {
      state.error = action.payload;
      state.removeshippinfo = null;
    },
  },
});

export const UserAction = userSlice.actions;
export default userSlice;
