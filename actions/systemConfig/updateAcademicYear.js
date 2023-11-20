import { DISSERTATION_BASE_URL } from "../../config/urls";

const updateAcademicYear =
  (values) =>
  async (dispatch, _getState, { api }) => {
    function onSuccess(response) {
      return response.data;
    }

    function onError(error) {
      return Promise.reject(error.response);
    }

    try {
      const { id, ...rest } = values;
      const response = await api.put(
        `${DISSERTATION_BASE_URL}/academicyear/${id}`,
        rest,
      );
      return onSuccess(response);
    } catch (error) {
      return onError(error);
    }
  };

export default updateAcademicYear;
