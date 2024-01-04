import { DISSERTATION_BASE_URL } from "../../config/urls";

const updateResearchProposal =
  (values) =>
  async (dispatch, _getState, { api }) => {
    function onSuccess(response) {
      if (response.data.isSuccess) {
        return response.data;
      }
      throw { response: { message: response.data.message } };
    }

    function onError(error) {
      return Promise.reject(error.response);
    }

    try {
      const response = await api.put(
        `${DISSERTATION_BASE_URL}/student/upload-research-proposal`,
        values,
      );
      return onSuccess(response);
    } catch (error) {
      return onError(error);
    }
  };

export default updateResearchProposal;
