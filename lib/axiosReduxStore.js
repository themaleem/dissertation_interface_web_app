/* eslint-disable no-underscore-dangle */
import axios from "axios";
import cookie from "cookie";

import initializeStore from "../store";
import { showNotification } from "../reducers/notification/notificationReducer";
import { setAuthCookies } from "./auth";

const REDUX_STORE = "REDUX_STORE";
const isServer = typeof window === "undefined";

// Error messages mapping
const errorMessages = {
  400: "Bad Request",
  500: "Something went wrong",
  401: "Unauthorized request",
};

// @note backend API URL
const baseURL = "https://difusermanagementapi.azurewebsites.net/api/v1";

const handleRequest = (request) => {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  const data = cookie.parse(document.cookie);
  if (data.accessToken) headers.Authorization = `Bearer ${data.accessToken}`;

  request.headers = { ...headers, ...request.headers };

  return request;
};

const handleResponseError = async (error, axiosInstance) => {
  // const { response } = error;

  // if (errorMessages[response.status] !== undefined) {
  //   if (response && errorMessages[response.status]) {
  //     window[REDUX_STORE].dispatch(
  //       showNotification(errorMessages[response.status]),
  //     );
  //   }
  // }

  // throw error;

  // Add a response interceptor
  const originalRequest = error.config;

  const isUnauthorized =
    error.response.data.name?.toLowerCase() === "unauthorized";

  // console.log(!originalRequest._retry);

  // If the error status is 401 and there is no originalRequest._retry flag,
  // it means the token has expired and we need to refresh it
  if (
    error.response.status === 401 &&
    isUnauthorized &&
    !originalRequest._retry
  ) {
    originalRequest._retry = true;

    try {
      const data = cookie.parse(document.cookie);
      if (data.accessToken && data.refreshToken) {
        const response = await axios.post(`${baseURL}/auth/refresh-token`, {
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        });

        setAuthCookies(response, response.data.result);
      }

      // @note  Retry the original request with the new token
      return axiosInstance(originalRequest);
    } catch (err) {
      // @todo Handle refresh token error or redirect to login
      console.log("err");
    }
  }
  throw error;
};

const getOrCreateStore = () => {
  // @note Always make a new store if server, otherwise state is shared between requests
  if (isServer) return initializeStore();

  // Create store if unavailable on the client and set it on the window object
  if (!window[REDUX_STORE]) {
    const axiosClientConfig = {
      baseURL,
      // withCredentials: true,
      headers: { "X-Requested-With": "XMLHttpRequest" },
    };

    const axiosInstance = axios.create(axiosClientConfig);

    axiosInstance.interceptors.request.use((request) => handleRequest(request));

    axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => handleResponseError(error, axiosInstance),
    );

    window[REDUX_STORE] = initializeStore(axiosInstance);
  }
  return window[REDUX_STORE];
};

export default getOrCreateStore;
