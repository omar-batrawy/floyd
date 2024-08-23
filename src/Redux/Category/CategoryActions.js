import axios from "axios";
import { CategoryAction } from "./CategoryReducers.js";
import "../../../App.js";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const GetCategories = () => async (dispatch) => {

  try {
    dispatch(CategoryAction.CategoryRequest());
   

    const res = await axios.get(
      global.API_URL + "/wc/v3/products/categories?exclude=56,15&parent=0",
      {
        auth: {
          username: "ck_b560e725b97ebaa7191978975ddbd5d4cdf2bc2d",
          password: "cs_6e8345aca193952cb934dc311a202928a0cd3bf0",
        },
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Basic ${Basicauth}`,
        },
      }
    );

    dispatch(CategoryAction.CategorySuccess(res?.data));
} catch (error) {
    dispatch(CategoryAction.CategoryFail(error));
  }
};

export const GetSubCategories = (id) => async (dispatch) => {
  try {
    dispatch(CategoryAction.subcategoryRequest());
  
    const res = await axios.get(
      global.API_URL + "/wc/v3/products/categories?parent=" + id,
      {
        auth: {
          username: "ck_b560e725b97ebaa7191978975ddbd5d4cdf2bc2d",
          password: "cs_6e8345aca193952cb934dc311a202928a0cd3bf0",
        },
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Basic ${Basicauth}`,
        },
      }
    );

    dispatch(CategoryAction.subcategorySuccess(res?.data));
  } catch (error) {
    dispatch(CategoryAction.subcategoryFail(error));
  }
};
