import Head from "next/head";
import { Provider } from "react-redux";

import Dialog from "../containers/dialog";
import getOrCreateStore from "../lib/axiosReduxStore";
import Notification from "../components/notification";
import useIsClient from "../containers/hooks/useIsClient";
// import Online from "../components/layout/online";
// import ErrorBoundary from "../components/errorBoundary";

import "../public/styles/bulma.min.css";
import "../public/styles/normalize.css";
import "../public/styles/styles.css";
import "../public/styles/extras.css";

import "react-loading-skeleton/dist/skeleton.css";

const MyApp = ({ Component, pageProps }) => {
  // const isClient = useIsClient();

  return (
    <Provider store={getOrCreateStore()}>
      {/* @todo setup error boundary */}
      <>
        <Head>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <meta name="author" content="Sheffield Hallam" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <meta name="description" content="Sheffield Hallam Dissertation" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        </Head>

        {/* <Component online={!isClient || online} {...pageProps} /> */}
        <Component {...pageProps} />
        <Notification />
        <Dialog />
        {/* @todo setup online */}
        {/* <Online>
          {(online) => (
          )}
        </Online> */}
      </>
    </Provider>
  );
};

export default MyApp;

// https://web.dev/vitals/
// Will be called once for every metric that has to be reported.
export function reportWebVitals(metric) {
  // These metrics can be sent to any analytics service
}
