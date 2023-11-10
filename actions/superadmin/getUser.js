const getUser =
  (url) =>
  async (dispatch, _getState, { api }) => {
    function onSuccess(response) {
      return response.data;
    }

    function onError(error) {
      return Promise.reject(error.response);
    }

    try {
      const response = await api.get(url);
      return onSuccess(response);
    } catch (error) {
      return onError(error);
    }
  };

export default getUser;
