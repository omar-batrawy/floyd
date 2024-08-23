import axios from "axios";
import { UserAction } from "./UserReducers";
import "./../../../App.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native"; // import useNavigation hook
import { Alert } from "react-native";

export const signin = (email, password, navigation) => async (dispatch) => {
  try {
    dispatch(UserAction.loginRequest());

    const res = await axios.post(
      global.API_URL + "/simple-jwt-login/v1/auth",
      {
        email: email,
        password: password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch(UserAction.loginSuccess(res?.data));

    await Checkjwt(res?.data, navigation, dispatch); // Ensure dispatch is passed to Checkjwt
  } catch (error) {
    dispatch(UserAction.loginFail("Invalid Credentials"));
    alert(error?.response?.data?.data?.message || "Login failed");
  }
};

export const Checkjwt = async (loginSuccess, navigation, dispatch) => {
  const formData = new FormData();
  const jwt = loginSuccess?.data?.jwt;

  if (!jwt) {
    return;
  }

  formData.append("jwt", jwt);

  try {
    dispatch(UserAction.CheckjwtRequest());
  

    const res = await axios.post(
      global.API_URL + "/simple-jwt-login/v1/auth/validate",
      {
        jwt: jwt,
      }
    );

    const Userdata = res?.data;
    if (Userdata?.data?.jwt?.[0]?.token) {
      await AsyncStorage.setItem("token", Userdata.data.jwt[0].token);
    } else {
      throw new Error("Token not found");
    }

    await AsyncStorage.setItem("email", Userdata?.data?.user?.user_email || "");
    await AsyncStorage.setItem("id", Userdata?.data?.user?.ID || "");
    await AsyncStorage.setItem("name", Userdata?.data?.user?.user_login || "");
    await AsyncStorage.setItem("verfied", "true");

    dispatch(UserAction.CheckjwtSuccess(res?.data));
    await dispatch(GetCostumerInfo());

    navigation.reset({
      index: 0,
      routes: [{ name: "Homepage" }],
    });
  } catch (error) {
    dispatch(UserAction.CheckjwtFail(error));
    alert("Invalid User");
    await AsyncStorage.setItem("verfied", "false");
  }
};

export const verifycodee = (email, otp) => async (dispatch) => {
  try {
    dispatch(UserAction.checkotpRequest());

    const res = await axios.post(global.API_URL + "/api/check-otp", {
      email: email,
      otp: otp,
    });

    dispatch(UserAction.checkotpSuccess(res?.data));
  } catch (error) {
    dispatch(UserAction.checkotpFail(error));
    alert(error?.response?.data?.message);
  }
};

export const GetCostumerInfo = () => async (dispatch) => {
  const id = await AsyncStorage.getItem("id");
  try {
    dispatch(UserAction.costumerRequest());

    const res = await axios.get(global.API_URL + "/wc/v3/customers/" + id, {
      headers: {
        "Content-Type": "application/json",
      },
      auth: {
        username: "ck_b560e725b97ebaa7191978975ddbd5d4cdf2bc2d",
        password: "cs_6e8345aca193952cb934dc311a202928a0cd3bf0",
      },
    });

    const response = await axios.get(
      global.API_URL + "/wc/v3/wishlist/get_by_user/" + id,
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

    await AsyncStorage.setItem("shareKey", response?.data[0].share_key);

    dispatch(UserAction.costumerSuccess(res?.data));
    await AsyncStorage.setItem("phone", res?.data?.shipping?.phone);
    await AsyncStorage.setItem("address", res?.data?.shipping?.address_1);
    await AsyncStorage.setItem("city", res?.data?.shipping?.city);
    await AsyncStorage.setItem("address_2", res?.data?.shipping?.address_2);
  } catch (error) {
    dispatch(UserAction.costumerFail(error));
    alert(error?.response?.data?.message);
  }
};

export const ResetPassword = (email, navigation) => async (dispatch) => {
  try {
    dispatch(UserAction.ResetPasswordRequest());

    const res = await axios.post(
      global.API_URL + "/simple-jwt-login/v1/user/reset_password",
      {
        email: email,
      }
    );

    dispatch(UserAction.ResetPasswordSuccess(res?.data));
    Alert.alert(
      "Password Reset",
      "Please check your email for the reset link.",
      [
        {
          text: "OK",
          onPress: () => navigation.navigate("Login"),
        },
      ]
    );
  } catch (error) {
    dispatch(UserAction.ResetPasswordFail(error));
    alert(error?.response?.data?.message);
  }
};
export const getwhishList = () => async (dispatch) => {
  const shareKey = await AsyncStorage.getItem("shareKey");
  try {
    dispatch(UserAction.whishlistRequest());
    const res = await axios.post(
      global.API_URL + "/wc/v3/wishlist/" + shareKey + "/get_products_detailed"
    );


    dispatch(UserAction.whishlistSuccess(res?.data));
  } catch (error) {
    dispatch(UserAction.whishlistFail(error));
  }
};

export const logout = async () => {
  try {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("email");
  } catch (error) {
  }
};
export const register = (data, navigation) => async (dispatch) => {
  try {
    dispatch(UserAction.AdduserRequest());

    const res = await axios.post(global.API_URL + "/wc/v3/customers", data, {
      headers: {
        "Content-Type": "application/json",
      },
      auth: {
        username: "ck_b560e725b97ebaa7191978975ddbd5d4cdf2bc2d",
        password: "cs_6e8345aca193952cb934dc311a202928a0cd3bf0",
      },
    });

    dispatch(UserAction.AdduserSuccess(res?.data));

    Alert.alert(
      "Account Created",
      "Please verify your email to login. A verification link has been sent to your email.",
      [
        {
          text: "OK",
          onPress: () => navigation.navigate("Login"),
        },
      ]
    );
  } catch (error) {
    dispatch(UserAction.AdduserFail(error));
    alert(error?.response?.data?.message);
  }
};

export const AddtowishList = (product_id,navigation) => async (dispatch) => {
  const UseShare = await AsyncStorage.getItem("shareKey");


  if(!UseShare){
    Alert.alert(
      "Login Required",
      "Please login to add to wishlist.",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Login",
          onPress: () => navigation.navigate("Login"),
        },
      ]
    );    return;
  }


  try {
    dispatch(UserAction.AddwhishlistRequest());

    const res = await axios.post(
      global.API_URL + "/wc/v3/wishlist/" + UseShare + "/add_product",
      {
        product_id: product_id,
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

    dispatch(UserAction.AddwhishlistSuccess(res?.data));
    dispatch(getwhishList());
  } catch (error) {
    dispatch(UserAction.AddwhishlistFail(error));

  }
};


export const RemovewishList = (favoriteid) => async (dispatch) => {
  if (!favoriteid) {
    return;
  }
  try {
    dispatch(UserAction.removefromwhishlistRequest());
    const res = await axios.get(
      global.API_URL + "/wc/v3/wishlist/remove_product/" +favoriteid,
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

    dispatch(UserAction.removefromwhishlistSuccess(res?.data));
    dispatch(getwhishList());
  } catch (error) {
    dispatch(UserAction.removefromwhishlistFail(error));

  }
};


export const getShipping = () => async (dispatch) => {
  const id = await AsyncStorage.getItem("id");

  try {
    dispatch(UserAction.shippinfoRequest());

    const res = await axios.get(
      global.API_URL + "/wc/v3/customers/" + id + "/shipping-addresses"
    );


    dispatch(UserAction.shippinfoSuccess(res?.data));
  } catch (error) {
    dispatch(UserAction.shippinfoFail(error));
    console.log("error",error)
  }
};


export const AddLocationFunction = (data,navigation) => async (dispatch) => {
  const id = await AsyncStorage.getItem("id");

  if(!id){
    Alert.alert(
      "Login Required",
      "Please login to add to Location.",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Login",
          onPress: () => navigation.navigate("Me"),
        },
      ]
    );    return;
  }


  try {
    dispatch(UserAction.AddshippinfoRequest());

    const res = await axios.post(
      global.API_URL + "/wc/v3/customers/" + id + "/shipping-addresses",
      
        data
      ,
      {
        headers: {
          "Content-Type": "application/json",
        },
        // auth: {
        //   username: "ck_b560e725b97ebaa7191978975ddbd5d4cdf2bc2d",
        //   password: "cs_6e8345aca193952cb934dc311a202928a0cd3bf0",
        // },
      }
    );

    dispatch(UserAction.AddshippinfoSuccess(res?.data));
    dispatch(getShipping());
    navigation.navigate("ME");  

    // console.log("res",res)
    // dispatch(getShipping());
  } catch (error) {
    dispatch(UserAction.AddshippinfoFail(error));
    alert(error?.response?.data?.message);

    // console.log("error",error)

  }
};


export const RemoveShipping = (shippingId) => async (dispatch) => {
  const id = await AsyncStorage.getItem("id");
  
  try {
    dispatch(UserAction.removeshippinfoRequest());
    const res = await axios.delete(
      global.API_URL + "/wc/v3/customers/" +id+ "/shipping-addresses/"+shippingId,
      {
        headers: {
          "Content-Type": "application/json",
        },
        // auth: {
        //   username: "ck_b560e725b97ebaa7191978975ddbd5d4cdf2bc2d",
        //   password: "cs_6e8345aca193952cb934dc311a202928a0cd3bf0",
        // },
      }
    );

    dispatch(UserAction.removeshippinfoSuccess(res?.data));
    // alert("Location Removed");
    dispatch(getShipping());
  } catch (error) {
    dispatch(UserAction.removeshippinfoFail(error));
    console.log("error",error)

  }
};

