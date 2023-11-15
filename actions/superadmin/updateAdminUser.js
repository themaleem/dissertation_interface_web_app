const updateAdminUser =
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
      const response = await api.put("/user/edit-admin-user", values);
      return onSuccess(response);
    } catch (error) {
      return onError(error);
    }
  };

export default updateAdminUser;

// {
//   "userId": "string",
//   "email": "string",
//   "firstName": "string",
//   "lastName": "string",
//   "userName": "string"
// }
