import { INITIAL_STATE as AUTH_INITIAL_STATE } from "./auth/authReducer";
import { INITIAL_STATE as NOTIFICATION_INITIAL_STATE } from "./notification/notificationReducer";

const stateMap = {
  auth: AUTH_INITIAL_STATE,
  notification: NOTIFICATION_INITIAL_STATE,
};

const getDefaultState = (exclude = {}) => {
  const defaultState = {};
  Object.keys(stateMap).forEach((key) => {
    if (!exclude[key]) {
      defaultState[key] = stateMap[key];
    }
  });
  return defaultState;
};

export default getDefaultState;
