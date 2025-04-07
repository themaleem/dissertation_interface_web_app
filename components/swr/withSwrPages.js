import useSWR, { useSWRConfig } from "swr";
import PropTypes from "prop-types";
import useSWRInfinite from "swr/infinite";
import { useRef, useMemo, useEffect, useCallback } from "react";

import { createStringifiedUrl } from "../../lib/objects";

const emptyObject = {};

const processData = (data, resourceIdxs, swrIndex, obj) => {
  Object.entries(data).forEach(([key, resources]) => {
    obj[key] = { ...obj[key], ...resources };
    if (key !== "meta") {
      Object.keys(resources).forEach((id) => {
        if (!resourceIdxs.current[key]) resourceIdxs.current[key] = {};
        if (!resourceIdxs.current[key][id]) resourceIdxs.current[key][id] = [];
        resourceIdxs.current[key][id].push(swrIndex);
      });
    }
  });
};

const generateKey = (baseUrl, params, swrsKeys) => {
  const key = createStringifiedUrl(baseUrl, params);
  if (swrsKeys) swrsKeys.current[key] = 1;
  return key;
};

// docs/motivation
// https://the2g.com/3023
// https://sergiodxa.com/articles/swr/pagination/
// https://www.gitmemory.com/issue/zeit/swr/124/554339753
// https://sergiodxa.com/articles/type-states-client-side-app/
// https://github.com/zeit/swr/blob/master/src/use-swr-pages.tsx
// https://medium.com/better-programming/why-you-should-be-separating-your-server-cache-from-your-ui-state-1585a9ae8336

const useWithSwrPages = ({
  auth,
  online,
  onData, // data variable in onData function in Parent should be a stable non-state variable
  fetchOn,
  baseUrl, // should be a stable prop  --- we might need to change how we send baseUrl here from url.js... maybe memoize it
  fetcher,
  resource,
  setCallbacks,
  config = emptyObject, // should be a stable prop
  params = emptyObject,
}) => {
  const swrsKeys = useRef({}); // track all generated swr key ... used to manually clear cache when key changes
  const resourceIndexes = useRef(); // track the data indexes for a resource id.. used by onAdd and onDelete

  const { cache } = useSWRConfig();

  // A function to get the SWR key of each page. Its return value will be accepted by `fetcher`.
  // If `null` is returned, the request of that page won't start.
  const getKey = useCallback(
    (_pageIndex, previousPageData) => {
      if ((fetchOn && !fetchOn()) || (!fetchOn && auth.user?.id === undefined))
        return null;

      const cursor = previousPageData?.meta?.cursor;
      return cursor === null
        ? null
        : generateKey(
            baseUrl,
            { ...params, ...(cursor && { cursor }) },
            swrsKeys,
          );
    },
    [auth.user?.id, baseUrl, fetchOn, params],
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

  const { data, error, isValidating, mutate, size, setSize } = useSWR(
    getKey,
    swrFetcher,
    {
      ...config,
      ...{
        // ///////////////////////// remove this config later TODO
        revalidateAll: true,
        revalidateOnMount: true,
        revalidateOnReconnect: false,
        // focusThrottleInterval: 9999999999
      },
    },
  );

  // TODO This clearing logic probably needs work. No clear way to do this per the docs
  // TODO: remove this as I can no longer use the serializeKey api...check where clear is being used
  const clear = useCallback(() => {
    return;
    Object.keys(swrsKeys.current).forEach((k) => {
      const [key, , errorKey] = cache.serializeKey(k);
      // todo there could be other caches to delete
      cache.delete(key);
      cache.delete(errorKey); // also clear the swr error cache
    });
    swrsKeys.current = {};
    resourceIndexes.current = {};
  }, [cache]);

  // TODO: remove this as I can no longer use the serializeKey api...check where clear is being used
  const clearSwrPages = useCallback(
    (newUrl, newParams) => {
      const newKey = createStringifiedUrl(newUrl, { ...newParams });
      if (!swrsKeys.current[newKey]) clear(); // don't clear the cache if new filter request is the same as the current one
    },
    [clear],
  );

  const onAdd = useCallback(
    (obj, revalidate = false, onlyUpdate = false) => {
      const newData = [...(data || [])];
      Object.entries(obj).forEach(([key, resources]) => {
        // Ex. meta could be undefined
        if (resources) {
          Object.keys(resources).forEach((id) => {
            let indexes = resourceIndexes.current[key]?.[id];
            // 0 means new object
            indexes = indexes || (onlyUpdate ? [] : [0]);
            indexes.forEach((idx) => {
              newData[idx] = { ...newData[idx] };
              newData[idx][key] = { ...newData[idx][key], [id]: obj[key][id] };
            });
          });
        }
      });
      return mutate(newData, revalidate);
    },
    [mutate, data],
  );

  // 1. Because user might be deleting objects across different swr pages, we need to group all the ids
  // then remove the ids from the swr data array at once
  const onDelete = useCallback(
    (ids, revalidate = false) => {
      let swrIndexAry;
      const idsToRemove = Array.isArray(ids) ? ids : [ids];
      const idsByResourceIndex = idsToRemove.reduce((obj, objId) => {
        swrIndexAry = resourceIndexes.current[resource][objId];
        if (swrIndexAry) {
          swrIndexAry.forEach((idx) => {
            if (obj[idx] === undefined) obj[idx] = {};
            obj[idx][objId] = objId;
          });
        }
        return obj;
      }, {});

      const newData = [...data];
      Object.keys(idsByResourceIndex).forEach((index) => {
        newData[index] = { ...newData[index], [resource]: {} };
        Object.keys(data[index][resource]).reduce((obj, objId) => {
          if (!idsByResourceIndex[index][objId])
            obj[objId] = data[index][resource][objId];
          return obj;
        }, newData[index][resource]);
      });

      return mutate(newData, revalidate);
    },
    [data, mutate, resource],
  );

  // TODO: remove this as I can no longer use the serializeKey api...check where clear is being used
  const reset = useCallback(() => {
    clear();
    setSize(1);
  }, [clear, setSize]);

  useEffect(() => {
    if (setCallbacks)
      setCallbacks({ onAdd, reset, clear, onDelete, clearSwrPages });
  }, [setCallbacks, onAdd, reset, onDelete, clear, clearSwrPages]);

  const loadMore = useCallback(() => setSize(size + 1), [setSize, size]);

  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === "undefined");

  // Optionally can use per_page size
  // NOTE: this code MUST explicitly return true or false.
  const isReachingEnd =
    data && data[data.length - 1]?.meta?.cursor === null ? true : false;

  // NOTE: this code MUST explicitly return true or false.
  const isRefreshing =
    isValidating && data && data.length === size ? true : false;

  // // TODO 3. isLoadingMore isn't calculated properly
  // // TODO 4. data is undefined even when adding the second one

  const newData = useMemo(() => {
    const obj = {};
    resourceIndexes.current = {};
    (data || []).forEach((res, index) => {
      if (res) processData(res, resourceIndexes, index, obj);
    });
    return obj;
  }, [data]);

  useEffect(() => {
    onData?.(newData); // Update parent with data. Used when using render Prop YW!
  }, [newData, onData]);

  return {
    onAdd,
    clear,
    reset,
    onDelete,
    loadMore,
    isRefreshing,
    clearSwrPages,
    isReachingEnd,
    isLoadingMore,
    data: newData,
    isLoadingInitialData,
  };
};

useWithSwrPages.defaultProps = {
  onData: undefined,
  params: undefined,
  config: undefined,
  fetchOn: undefined,
  setCallbacks: undefined,
};

useWithSwrPages.propTypes = {
  onData: PropTypes.func, // data variable in onData function in Parent should be a stable non-state variable
  fetchOn: PropTypes.func,
  setCallbacks: PropTypes.func,
  fetcher: PropTypes.func.isRequired,
  baseUrl: PropTypes.string.isRequired,
  params: PropTypes.instanceOf(Object),
  config: PropTypes.instanceOf(Object), // should be a stable prop if possible
  resource: PropTypes.string.isRequired,
  auth: PropTypes.instanceOf(Object).isRequired,
};

export default useWithSwrPages;
