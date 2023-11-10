export const DISABLE_ALL_REVALIDATION = {
  dedupingInterval: 0,
  focusThrottleInterval: 0,
  revalidateOnFocus: false,
  // revalidateOnMount: false,
  revalidateOnReconnect: false,
};

export const NO_FOCUS_REVALIDATION = { revalidateOnFocus: false };

export const ONLY_FOCUS_REVALIDATION = {
  dedupingInterval: 0,
  revalidateOnFocus: true,
  focusThrottleInterval: 0,
  revalidateOnReconnect: false,
};
