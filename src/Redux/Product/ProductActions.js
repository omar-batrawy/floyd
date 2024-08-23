import axios from "axios";
import { ProductAction } from "./ProductReducers.js";
import "../../../App.js";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const GetProduct = (filters) => async (dispatch) => {
  let queryString='1=1'

  if(filters.brand){
      filters.brand.map((brand)=>{
          queryString+=`&brand=${brand}`
      })
  }
  if(filters.on_sale){
          queryString+=`&on_sale=true`
      }
  if(filters.category){
      filters.category.map((category)=>{
        if(category!=null)
          queryString+=`&category=${category}`
        else
          return
        
        })
  }
  if(filters.pagination){
      queryString+=`&page=${filters.pagination.page}&per_page=${filters.pagination.per_page}`
  }

  if(filters.sort){
      queryString+=`&sort=${filters.sort.sort}&order=${filters.sort.order}`
  }

  if(filters.user){
      queryString+=`&user=${filters.user}`
  }
  if(filters.min_price){
    queryString+=`&min_price=${filters.min_price}`
  }
  if(filters.max_price){
    queryString+=`&max_price=${filters.max_price}`
  }
  if(filters.search){
    queryString+=`&search=${filters.search}`
  }
  if(filters.order){
    if(filters.order=='asc'||filters.order=='desc'){
    queryString+=`&order=${filters.order}`
    }
    else{
   return    }
  }
  if(filters.orderby){
    queryString+=`&orderby=${filters.orderby}`
  }
  try {
    dispatch(ProductAction.ProductRequest());
    console.log("filters",filters)
   

    const res = await axios.get(
      global.API_URL + `/wc/v3/products?${queryString}`,
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

    dispatch(ProductAction.ProductSuccess(res?.data));
    console.log("res",res?.data)
  } catch (error) {
    dispatch(ProductAction.ProductFail(error));
  }
};
export const GetPromotion = (filters) => async (dispatch) => {
  let queryString='1=1'

  if(filters.brand){
      filters.brand.map((brand)=>{
          queryString+=`&brand=${brand}`
      })
  }
  if(filters.on_sale){
          queryString+=`&on_sale=true`
      }
  if(filters.category){
      filters.category.map((category)=>{
          queryString+=`&category=${category}`
      })
  }
  if(filters.search){
    queryString+=`&search=${filters.search}`
  }
  if(filters.pagination){
      queryString+=`&page=${filters.pagination.page}&limit=${filters.pagination.limit}`
  }

  if(filters.sort){
      queryString+=`&sort=${filters.sort.sort}&order=${filters.sort.order}`
  }

  if(filters.user){
      queryString+=`&user=${filters.user}`
  }

  try {
    dispatch(ProductAction.PromotionRequest());
  

    const res = await axios.get(
      global.API_URL + `/wc/v3/products?${queryString}`,
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

    dispatch(ProductAction.PromotionSuccess(res?.data));
  } catch (error) {
    dispatch(ProductAction.PromotionFail(error));
  }
};



export const addToCart = async (item) => {
  try {
    const cart = await getCart();
    cart.push(item);
    await AsyncStorage.setItem('cart', JSON.stringify(cart));
    getCart();
  } catch (error) {
    console.error('Error adding item to cart', error);
  }
};

// Function to get the cart
export const getCart = async () => {
  try {
    const cart = await AsyncStorage.getItem('cart');

    return cart ? JSON.parse(cart) : [];
  } catch (error) {
    console.error('Error getting cart', error);
    return [];
  }
};

// Function to remove an item from the cart
export const removeFromCart = async (itemId) => {
  try {
    let cart = await getCart();
    cart = cart.filter(item => item.id !== itemId);
    await AsyncStorage.setItem('cart', JSON.stringify(cart));
  } catch (error) {
    console.error('Error removing item from cart', error);
  }
};
export const GetOneproduct = (id) => async (dispatch) => {

  try {
    dispatch(ProductAction.oneproductRequest());
    dispatch(ProductAction.productVariationRequest());
   

    const res = await axios.get(
      global.API_URL + "/wc/v3/products/"+id,
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
    const Variationres = await axios.get(
      global.API_URL + "/wc/v3/products/"+id+"/variations",
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
    console.log("Variationres?.data",Variationres?.data)

    dispatch(ProductAction.oneproductSuccess(res?.data));
    dispatch(ProductAction.productVariationSuccess(Variationres?.data));
} catch (error) {
    dispatch(ProductAction.oneproductFail(error));
    dispatch(ProductAction.productVariationFail(error));
  }
};