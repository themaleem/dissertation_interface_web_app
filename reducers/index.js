import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "./auth/authReducer";
import getDefaultState from "./defaultState";

const appReducer = combineReducers({ auth: authReducer });

const rootReducer = (state, action) => {
  if (action.type === "SIGN_OUT") return appReducer(getDefaultState(), action);

  return appReducer(state, action);
};

export default rootReducer;
