import PropTypes from "prop-types";
import useSWR, { useSWRConfig } from "swr";
import { useMemo, useEffect, useCallback } from "react";

import { createStringifiedUrl } from "../../lib/objects";

const emptyObject = {};

const useWithSWR = ({
  auth,
  // online,
  fetcher,
  fetchOn,
  baseUrl,
  setCallbacks,
  config = emptyObject,
  params = emptyObject,
}) => {
  const { cache: swrCache } = useSWRConfig();

  const key = useMemo(
    () => createStringifiedUrl(baseUrl, { ...params }),
    [baseUrl, params],
  );

  const swrFetcher = useCallback(
    async (path) => {
      try {
        const response = await fetcher(path, params.normalize);
        return response;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    [fetcher, params.normalize],
  );

  const { data, isValidating, error, mutate } = useSWR(
    () => {
      return !(fetchOn?.() || auth.user.id) || key;
    },
    swrFetcher,
    config,
  );

  const mutateData = useCallback(
    (newData, revalidate = false) => {
      return mutate((cache) => {
        const draft = { ...cache };
        Object.keys(newData).forEach((dataKey) => {
          if (newData[dataKey]) {
            draft[dataKey] = { ...(draft[dataKey] || {}), ...newData[dataKey] };
          }
        });
        return draft;
      }, revalidate);
    },
    [mutate],
  );

  const clear = useCallback(() => {
    swrCache.delete(key);
  }, [key, swrCache]);

  useEffect(() => {
    if (setCallbacks) setCallbacks({ mutateData });
  }, [setCallbacks, mutateData]);

  return { data, clear, isValidating, error, mutateData };
};

useWithSWR.defaultProps = {
  online: false,
  auth: undefined,
  params: undefined,
  config: undefined,
  fetchOn: undefined,
  setCallbacks: undefined,
};

useWithSWR.propTypes = {
  online: PropTypes.bool,
  fetchOn: PropTypes.func,
  setCallbacks: PropTypes.func,
  auth: PropTypes.instanceOf(Object),
  fetcher: PropTypes.func.isRequired,
  config: PropTypes.instanceOf(Object),
  baseUrl: PropTypes.string.isRequired,
  params: PropTypes.instanceOf(Object),
};

export default useWithSWR;
