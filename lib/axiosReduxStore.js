/* eslint-disable no-underscore-dangle */

import axios from "axios";
import cookie from "cookie";
import Router from "next/router";

import initializeStore from "../store";
import { getPath } from "../config/urls";
import { removeDocumentAuthCookies, setAuthCookies } from "./auth";
import { signOut, signingOut } from "../reducers/auth/authReducer";

const REDUX_STORE = "REDUX_STORE";
const isServer = typeof window === "undefined";

// @note backend API URL
const baseURL = "https://difusermanagementapi.azurewebsites.net/api/v1";

const clearCacheAndSignout = () => {
  window[REDUX_STORE].dispatch(signingOut());
  removeDocumentAuthCookies();
  window[REDUX_STORE].dispatch(signOut());
  Router.push(getPath("signInPath"));
};

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
  const {
    response: {
      data: { message, name },
    },
  } = error;

  if (message.toLowerCase() === "no token") return clearCacheAndSignout();

  const isUnauthorized = name?.toLowerCase() === "unauthorized";
  const originalRequest = error.config;
  // @note If the error status is 401 and there is no originalRequest._retry flag,
  // it means the token has expired and we need to refresh it
  if (
    error.response.status === 401 &&
    isUnauthorized &&
    !originalRequest._retry
  ) {
    originalRequest._retry = true;

    try {
      const data = cookie.parse(document.cookie);
      const response = await axios.post(`${baseURL}/auth/refresh-token`, {
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      });

      // @note  Retry the original request with the new token
      if (response.data.isSuccess) {
        setAuthCookies(response, response.data.result);
        return axiosInstance(originalRequest);
      }
      return clearCacheAndSignout();
    } catch (err) {
      return clearCacheAndSignout();
    }
  }
  // @todo throw error if it fails for other reasons apart from 401?
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
