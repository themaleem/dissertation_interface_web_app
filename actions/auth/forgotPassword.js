import { showNotification } from "../../components/notification";

const forgotPassword =
  (values) =>
  async (dispatch, _getState, { api }) => {
    function onSuccess(response) {
      if (response.data.isSuccess) {
        // @note  edge-case where result is null returning true here
        return true;
      }
      showNotification({ detail: response.data.message });
      return undefined;
    }

    function onError(error) {
      return Promise.reject(error.response);
    }

    try {
      const response = await api.post("/auth/initiate-reset-password", values);
      return onSuccess(response);
    } catch (error) {
      return onError(error);
    }
  };

export default forgotPassword;
