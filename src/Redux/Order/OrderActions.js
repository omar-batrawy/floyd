import axios from "axios";
import { OrderAction } from "./OrderReducers.js";
import "../../../App.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry.js";
import { getCart } from "../Product/ProductActions.js";
import { Alert } from "react-native";

export const GetOrders = () => async (dispatch) => {

  const id = await AsyncStorage.getItem("id");
 
  try {
    dispatch(OrderAction.OrderRequest());
   

    const res = await axios.get(
      global.API_URL + "/wc/v3/orders?customer=" + id,
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

    dispatch(OrderAction.OrderSuccess(res?.data));
} catch (error) {
    dispatch(OrderAction.OrderFail(error));
    console.log("error", error);
  }
};


export const AddOrder = (line_items,shipping,shipping_lines,billing,payment_method,payment_method_title) => async (dispatch) => {
  
  Alert.alert(
    "Order Confirmation",
    "Are you sure you want to place this order on Address: "+billing.address_1+" "+billing.address_2+" "+billing.city+" "+billing.postcode+" "+billing.country+" ?",
    [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      { text: "OK", onPress: async () => {
        try {
          dispatch(AddOrderConfirm(line_items,shipping,shipping_lines,billing,payment_method,payment_method_title));
         
        } catch (error) {
          dispatch(OrderAction.addOrderFail(error));
          console.log("error", error?.response?.data?.message);
      
        }
      }
    }
    ]
  );
  };
  



export const AddOrderConfirm = (line_items,shipping,shipping_lines,billing,payment_method,payment_method_title) => async (dispatch) => {
const id = await AsyncStorage.getItem("id");



  try {
    dispatch(OrderAction.addOrderRequest());

    const res = await axios.post(
      global.API_URL + "/wc/v3/orders",
      {
        line_items: line_items,
        shipping : shipping,
        shipping_lines : shipping_lines,
        billing : billing,
        "set_paid": false,
        "customer_id" : id,
        "payment_method": payment_method,
        "payment_method_title": payment_method_title,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        auth: {
          username: "ck_b560e725b97ebaa7191978975ddbd5d4cdf2bc2d",
          password: "cs_6e8345aca193952cb934dc311a202928a0cd3bf0",
        },
      }
    );

    dispatch(OrderAction.addOrderSuccess(res?.data));
    await AsyncStorage.setItem("cart", JSON.stringify([]));
    dispatch(GetOrders());
    getCart();
  } catch (error) {
    dispatch(OrderAction.addOrderFail(error));
    console.log("error", error?.response?.data?.message);

  }
};
