import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlices";
import profileReducer from "../slices/profileSlices";
import cartReducer from "../slices/cartSlices";

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  cart: cartReducer,
});

export default rootReducer;
