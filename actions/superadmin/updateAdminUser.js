import { showNotification } from "../../reducers/notification/notificationReducer";

const updateAdminUser =
  (values) =>
  async (dispatch, _getState, { api }) => {
    function onSuccess(response) {
      if (response.data.isSuccess) {
        return response.data;
      }
      dispatch(showNotification(response.data.message));
      // @note explicitly returning false
      return false;
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
