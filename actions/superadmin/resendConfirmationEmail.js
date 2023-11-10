const resendConfirmationEmail =
  (values) =>
  async (dispatch, _getState, { api }) => {
    function onSuccess(response) {
      return response.data;
    }

    function onError(error) {
      return Promise.reject(error.response);
    }

    try {
      const response = await api.post("/user/resend-confirm-email", values);
      return onSuccess(response);
    } catch (error) {
      return onError(error);
    }
  };

export default resendConfirmationEmail;
