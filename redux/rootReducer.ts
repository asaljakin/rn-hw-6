import { combineReducers } from "@reduxjs/toolkit";
// import userSlice from "./reducers/userSlice";
import userReducer from "./reducers/userSlice";
export const rootReducer = combineReducers({
  user: userReducer,
});


