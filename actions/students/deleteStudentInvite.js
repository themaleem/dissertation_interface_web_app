import { DISSERTATION_BASE_URL } from "../../config/urls";

const deleteStudentInvite =
  (id) =>
  async (dispatch, _getState, { api }) => {
    function onSuccess(response) {
      return response.data;
    }

    function onError(error) {
      return Promise.reject(error.response);
    }

    try {
      const response = await api.delete(
        `${DISSERTATION_BASE_URL}/studentinvite/${id}`,
      );
      return onSuccess(response);
    } catch (error) {
      return onError(error);
    }
  };

export default deleteStudentInvite;
