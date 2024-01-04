import { DISSERTATION_BASE_URL } from "../../config/urls";

const removeSupervisorFromCohort =
  (supervisionCohortId) =>
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
      const response = await api.delete(
        `${DISSERTATION_BASE_URL}/supervisioncohort/${supervisionCohortId}`,
        { supervisionCohortId },
      );
      return onSuccess(response);
    } catch (error) {
      return onError(error);
    }
  };

export default removeSupervisorFromCohort;
