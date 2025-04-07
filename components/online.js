// import PropTypes from "prop-types";
// import { Detector } from "react-detect-offline";
// import { connect, useDispatch } from "react-redux";
// import { useEffect, useCallback, useRef } from "react";

// import setOnline from "../../actions/online/setOnline";
// import saveClientStatus from "../../actions/users/saveClientStatus";

// // @note this needs to correspond with settings in backend config
// const INTERVAL =
//   process.env.NEXT_PUBLIC_STAGE === "development" ? 30000 : 15000;

// const Online = ({ children, memberId }) => {
//   const interval = useRef();

//   const dispatch = useDispatch();

//   const setClientStatus = useCallback(() => {
//     return dispatch(saveClientStatus()).catch();
//   }, [dispatch]);

//   useEffect(() => {
//     if (memberId) {
//       setClientStatus();
//       interval.current = setInterval(setClientStatus, INTERVAL);
//     }
//     return () => window.clearInterval(interval.current);
//   }, [memberId, setClientStatus]);

//   const onChange = useCallback(
//     (isOnline) => {
//       dispatch(setOnline(isOnline));
//     },
//     [dispatch],
//   );

//   return (
//     <Detector
//       onChange={onChange}
//       render={({ online }) => children(online)}
//       polling={{ url: "https://icanhazip.com/" }}
//     />
//   );
// };

// Online.defaultProps = {
//   memberId: undefined,
// };

// Online.propTypes = {
//   memberId: PropTypes.string,
//   children: PropTypes.instanceOf(Object).isRequired,
// };

// const mapStateToProps = ({ auth: { member } }) => ({
//   memberId: member?.id,
// });

// export default connect(mapStateToProps)(Online);
