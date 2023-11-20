import { DISSERTATION_BASE_URL } from "../../../config/urls";

const updateCohort =
  (values) =>
  async (dispatch, _getState, { api }) => {
    function onSuccess(response) {
      if (response.data.isSuccess) {
        return response.data;
      }
      // @note explicitly throwing error
      throw { response: { message: response.data.message } };
    }

    function onError(error) {
      return Promise.reject(error.response);
    }

    try {
      const { id, ...rest } = values;
      const response = await api.put(
        `${DISSERTATION_BASE_URL}/dissertationcohort/${id}`,
        rest,
      );
      return onSuccess(response);
    } catch (error) {
      return onError(error);
    }
  };

export default updateCohort;
