import cookie from "cookie";

import { signInSuccess } from "../../reducers/auth/authReducer";

const getCurrentUser =
  (url) =>
  async (dispatch, _getState, { api }) => {
    function onSuccess(response) {
      const {
        data: {
          result: { user, role, isLockedOut },
        },
      } = response;

      const payload = {
        ...user,
        active: !isLockedOut,
      };

      const cookies = cookie.parse(document.cookie);
      payload.role = cookies.role || role;

      dispatch(signInSuccess(payload));
      return payload;
    }

    function onError(error) {
      return Promise.reject(error.response);
    }

    try {
      const response = await api.get(url);
      return onSuccess(response);
    } catch (error) {
      return onError(error);
    }
  };

export default getCurrentUser;
