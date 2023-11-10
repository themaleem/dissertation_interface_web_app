// import PropTypes from "prop-types";

// import { doNothing } from "../lib/objects";

// const Suspense = ({ data, hasData, skeleton, component }) => {
//   const showSkeleton = hasData && data === undefined;

//   return showSkeleton ? <>{skeleton()}</> : component(data);
// };

// Suspense.defaultProps = {
//   hasData: false,
//   data: undefined,
//   skeleton: doNothing,
//   component: doNothing,
// };

// Suspense.propTypes = {
//   data: PropTypes.any,
//   hasData: PropTypes.bool,
//   skeleton: PropTypes.func,
//   component: PropTypes.func,
// };

// export default Suspense;

import PropTypes from "prop-types";

import { doNothing } from "../lib/objects";

const Suspense = ({ auth, noAuth, data, hasData, skeleton, component }) => {
  const showSkeleton =
    (auth.user === undefined && !noAuth) || (hasData && data === undefined);

  return showSkeleton ? <>{skeleton()}</> : component(data);
};

Suspense.defaultProps = {
  noAuth: false,
  hasData: false,
  auth: undefined,
  data: undefined,
  skeleton: doNothing,
  component: doNothing,
};

// TODO
Suspense.propTypes = {
  data: PropTypes.any,
  noAuth: PropTypes.bool,
  hasData: PropTypes.bool,
  skeleton: PropTypes.func,
  component: PropTypes.func,
  auth: PropTypes.objectOf(PropTypes.any),
};

export default Suspense;
