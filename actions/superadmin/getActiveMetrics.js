import { DISSERTATION_BASE_URL } from "../../config/urls";

const getActiveMetrics =
  (url) =>
  async (dispatch, _getState, { api }) => {
    function onSuccess(response) {
      if (response.data.isSuccess) {
        return response.data.result;
      }

      // @note explicitly throwing error
      throw { response: { message: response.data.message } };
    }

    function onError(error) {
      return Promise.reject(error.response);
    }

    try {
      const response = await api.get(`${DISSERTATION_BASE_URL}${url}`);
      return onSuccess(response);
    } catch (error) {
      return onError(error);
    }
  };

export default getActiveMetrics;
