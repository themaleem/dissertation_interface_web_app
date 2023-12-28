import cookie from "cookie";

import {
  // signOut,
  // signingOut,
  signInSuccess,
  updateRole,
} from "../reducers/auth/authReducer";
import { COOKIE_PROPS, DELETE_COOKIE_PROPS } from "../config/cookie";

// @todo might change the cookie names
// for fear of name being used on another app on sameSite
const setAuthCookies = (data) => {
  if (data.accessToken) {
    document.cookie = cookie.serialize(
      "accessToken",
      data.accessToken,
      COOKIE_PROPS,
    );
    document.cookie = cookie.serialize(
      "refreshToken",
      data.refreshToken,
      COOKIE_PROPS,
    );
    if (data.user) {
      document.cookie = cookie.serialize(
        "activeRole",
        data.activeRole,
        COOKIE_PROPS,
      );
      document.cookie = cookie.serialize("auid", data.user.id, COOKIE_PROPS);
    }
    // document.cookie = cookie.serialize("", headers.expiry, COOKIE_PROPS);
  }
};

const removeDocumentAuthCookies = () => {
  document.cookie = cookie.serialize("auid", "", DELETE_COOKIE_PROPS);
  document.cookie = cookie.serialize("role", "", DELETE_COOKIE_PROPS);
  document.cookie = cookie.serialize("accessToken", "", DELETE_COOKIE_PROPS);
  document.cookie = cookie.serialize("refreshToken", "", DELETE_COOKIE_PROPS);
};

const onSignIn = (data) => {
  const { user, activeRole, accessToken, refreshToken } = data;
  const payload = { ...user, activeRole, active: true };
  window.REDUX_STORE.dispatch(signInSuccess(payload));
  const cookieData = { accessToken, user, refreshToken, activeRole };
  setAuthCookies(accessToken && refreshToken ? cookieData : {});
};

const onChooseRole = (data) => {
  const payload = { activeRole: data.activeRole };
  window.REDUX_STORE.dispatch(updateRole(payload));
  document.cookie = cookie.serialize(
    "activeRole",
    data.activeRole,
    COOKIE_PROPS,
  );
};

// @note remove after testing token refresh
// const onSignOut = (dsptch, callback) => {
//   dsptch(signingOut());
//   removeDocumentAuthCookies();
//   callback();
//   dsptch(signOut());
// };

// export { onSignIn, setAuthCookies, onSignOut, removeDocumentAuthCookies };
export { onSignIn, setAuthCookies, removeDocumentAuthCookies, onChooseRole };
