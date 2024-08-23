import { combineReducers } from "redux";
import userSlice from "./User/UserReducers";
import CategorySlice from "./Category/CategoryReducers";
import ProductSlice from "./Product/ProductReducers";
import OrderSlice from "./Order/OrderReducers";
import PaymentSlice from "./Payment/PaymentReducers";

const rootReducer = combineReducers({
  user: userSlice.reducer,
  Category: CategorySlice.reducer,
  Product: ProductSlice.reducer,
  Order: OrderSlice.reducer,
  Payment: PaymentSlice.reducer,

});

export default rootReducer;
