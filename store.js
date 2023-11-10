import { configureStore } from "@reduxjs/toolkit";

import reducers from "./reducers";

export default function initializeStore(axiosInstance = null) {
  const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: axiosInstance ? { api: axiosInstance } : undefined,
        },
        immutableCheck: false,
        serializableCheck: false,
      }),
  });

  return store;
}
