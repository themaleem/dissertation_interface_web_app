import { DISSERTATION_BASE_URL } from "../../../config/urls";

const getDepartments =
  (url) =>
  async (dispatch, _getState, { api }) => {
    function onSuccess(response) {
      return response.data;
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

export default getDepartments;
