import { showNotification } from "../../components/notification";

const confirmEmail =
  (values) =>
  async (dispatch, _getState, { api }) => {
    function onSuccess(response) {
      if (response.data.isSuccess) {
        return response.data.result;
      }
      showNotification({ detail: response.data.message });
      return undefined;
    }

    function onError(error) {
      return Promise.reject(error.response);
    }

    try {
      const response = await api.post("/auth/confirm-email", values);
      return onSuccess(response);
    } catch (error) {
      return onError(error);
    }
  };

export default confirmEmail;
