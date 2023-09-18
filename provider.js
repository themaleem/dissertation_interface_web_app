"use client";

import { Provider } from "react-redux";
import { getOrCreateStore } from "@/lib/axiosReduxStore";

export default function Providers({ children }) {
  return <Provider store={getOrCreateStore()}>{children}</Provider>;
}
