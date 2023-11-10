"use client";

import { Provider } from "react-redux";

import getOrCreateStore from "./lib/axiosReduxStore";

const Providers = ({ children }) => {
  return <Provider store={getOrCreateStore()}>{children}</Provider>;
};

export default Providers;
