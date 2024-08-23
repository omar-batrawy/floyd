import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  Category: [],
  subcategory:[]

};

const CategorySlice = createSlice({
  name: "Category",
  initialState,
  reducers: {
    CategoryRequest: (state, action) => {
      state.loading = true;
      state.error = null;
      state.Category = null;
    },
    CategorySuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.Category = action.payload;
    },

    CategoryFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.Category = null;
    },

    subcategoryRequest: (state, action) => {
      state.loading = true;
      state.error = null;
      state.subcategory = null;
    },
    subcategorySuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.subcategory = action.payload;
    },

    subcategoryFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.subcategory = null;
    },

  
  },
});

export const CategoryAction = CategorySlice.actions;
export default CategorySlice;
