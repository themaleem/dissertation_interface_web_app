import { removeDocumentAuthCookies } from "../../lib/auth";
import { signingOut } from "../../reducers/auth/authReducer";

const signOut =
  () =>
  async (dispatch, _getState, { api }) => {
    function onSuccess(response) {
      removeDocumentAuthCookies();
      // dispatch({ type: "SIGN_OUT" });
      return response;
    }

    function onError(error) {
      return Promise.reject(error.response);
    }

    try {
      dispatch(signingOut());
      const response = await api.post("/auth/logout");
      return onSuccess(response);
    } catch (error) {
      return onError(error);
    }
  };

export default signOut;
