import cookie from "cookie";

import { COOKIE_PROPS, DELETE_COOKIE_PROPS } from "../config/cookie";
import { signInSuccess } from "../reducers/auth/authReducer";

// @todo might change the cookie names
// for fear of name being used on another app on sameSite
const setAuthCookies = (headers, data) => {
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
    if (data.user)
      document.cookie = cookie.serialize("auid", data.user.id, COOKIE_PROPS);
    // document.cookie = cookie.serialize("expiry", headers.expiry, COOKIE_PROPS);
    // document.cookie = cookie.serialize("client", headers.client, COOKIE_PROPS);
  }
};

const removeDocumentAuthCookies = () => {
  document.cookie = cookie.serialize("auid", "", DELETE_COOKIE_PROPS);
  document.cookie = cookie.serialize("accessToken", "", DELETE_COOKIE_PROPS);
  document.cookie = cookie.serialize("refreshToken", "", DELETE_COOKIE_PROPS);
  // document.cookie = cookie.serialize("expiry", "", DELETE_COOKIE_PROPS);
  // document.cookie = cookie.serialize("client", "", DELETE_COOKIE_PROPS);
};

const onSignIn = (response) => {
  const {
    data: {
      result: { user, role, accessToken, refreshToken },
    },
  } = response;

  const payload = { ...user, role: role[0].toLowerCase() };

  window.REDUX_STORE.dispatch(signInSuccess(payload));
  setAuthCookies(
    response.headers,
    accessToken && refreshToken ? { accessToken, user, refreshToken } : {},
  );

  return payload;
};

export { onSignIn, setAuthCookies, removeDocumentAuthCookies };
