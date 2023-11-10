import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "./auth/authReducer";
import getDefaultState from "./defaultState";
import notificationReducer from "./notification/notificationReducer";

const appReducer = combineReducers({
  auth: authReducer,
  notification: notificationReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "SIGN_OUT") return appReducer(getDefaultState(), action);

  return appReducer(state, action);
};

export default rootReducer;
