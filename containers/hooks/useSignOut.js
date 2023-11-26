import { useSWRConfig } from "swr";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

import { getPath } from "../../config/urls";
import { removeDocumentAuthCookies } from "../../lib/auth";
import { signOut, signingOut } from "../../reducers/auth/authReducer";

const useSignOut = (auth) => {
  const router = useRouter();
  const { cache } = useSWRConfig();

  const dispatch = useDispatch();

  const onSignOut = () => {
    if (!auth.signingOut) {
      dispatch(signingOut());
      removeDocumentAuthCookies();
      cache.clear();
      router
        .push(getPath("homePath").as)
        .then(() => {
          dispatch(signOut());
        })

        .catch();
    }
  };

  return { onSignOut };
};

export default useSignOut;
