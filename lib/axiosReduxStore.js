import axios from "axios";
// import cookie from "cookie";

import initializeStore from "../store";

const REDUX_STORE = "REDUX_STORE";
const isServer = typeof window === "undefined";

// @note backend API URL
const baseURL = "";

const handleRequest = (request) => {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  // const data = cookie.parse(document.cookie);
  // if (data.expiry) headers.expiry = data.expiry;
  // if (data["access-token"])
  //   headers["Authorization"] = `Bearer ${data["access-token"]}`;

  request.headers = { ...headers, ...request.headers };

  return request;
};

const handleResponseError = (error) => {
  const { response } = error;
  // @todo what do we intend to do with any request errors?
  console.log(response);
  throw error;
};

const getOrCreateStore = () => {
  // @note Always make a new store if server, otherwise state is shared between requests
  if (isServer) return initializeStore();

  // Create store if unavailable on the client and set it on the window object
  if (!window[REDUX_STORE]) {
    const axiosClientConfig = {
      baseURL,
      // @todo this extra headers object might not be needed
      headers: { "X-Requested-With": "XMLHttpRequest" },
    };

    const axiosInstance = axios.create(axiosClientConfig);

    axiosInstance.interceptors.request.use((request) => handleRequest(request));

    axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => handleResponseError(error)
    );

    window[REDUX_STORE] = initializeStore(axiosInstance);
  }
  return window[REDUX_STORE];
};

export { getOrCreateStore };
