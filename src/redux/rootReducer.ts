import { combineReducers } from "@reduxjs/toolkit";
import { userReducer } from "./user/userSlice";
// імпортуйте інші ред'юсери

const rootReducer = combineReducers({
  user: userReducer,
  // додайте інші ред'юсери
});

export default rootReducer;
