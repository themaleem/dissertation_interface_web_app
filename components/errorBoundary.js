// import Router from "next/router";
// import { Component } from "react";
// import PropTypes from "prop-types";
// import { connect } from "react-redux";

// import Image from "./image";
// import getPath from "../config/url";
// import error500Image from "../public/images/error-500.png";
// import onboardingLogoImage from "../public/images/onboarding-logo.svg";

// import MainStyles from "./css/main";
// import onboardingStyles from "./css/onboarding";
// import RelayFormStyles from "./css/relay-forms";

// class ErrorBoundary extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { hasError: false };
//     this.navigate = this.navigate.bind(this);
//   }

//   static getDerivedStateFromError() {
//     // @note below is set to true to catch client side error for both local and prod
//     return { hasError: true };
//   }

//   componentDidCatch(error, info) {
//     // console.log(error);
//     // console.log(info);
//     // @todo .. send to sentry
//     // logComponentStackToMyService(info.componentStack);
//   }

//   navigate() {
//     let path;
//     const { organization } = this.props;

//     if (organization) {
//       path = getPath("setupGuidePath", { organization_id: organization.attributes.slug }).as;
//     } else {
//       path = getPath("homePath").href;
//     }

//     Router.push(path).then(() => {
//       this.setState({ hasError: false });
//     });
//   }

//   render() {
//     const { hasError } = this.state;
//     const { children, organization } = this.props;

//     if (hasError) {
//       return (
//         <>
//           <main className="onboarding-wrapper">
//             <div className="onboarding-content-flexed">
//               <div className="onboarding-content-left">
//                 <Image src={onboardingLogoImage} className="onboarding-logo" alt="logo" width={60} />
//                 <div className="onboarding-main-illustration">
//                   <Image src={error500Image} className="onboarding-main-illustration inverted" alt="error-logo" />
//                 </div>
//               </div>
//               <div className="onboarding-content-right">
//                 <div className="onboarding-content-wrapper">
//                   <div className="onboarding-content-form-card err">
//                     <h3>Oops, something went wrong</h3>
//                     <p className="onboarding-foot-text">
//                       It&apos;s not you, it&apos;s us. You can refresh this page or
//                       <a href="#"> contact</a> us if this issue persists
//                     </p>
//                     <div className="onboarding-form-divider">
//                       <span> or</span>
//                     </div>
//                     <div className="level">
//                       <div className="level-item">
//                         <button
//                           type="button"
//                           onClick={this.navigate}
//                           className="button is-fullwidth is-rounded is-dark"
//                         >
//                           <b> Return to {organization ? "Dashboard" : "Homepage"} </b>
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </main>

//           <style jsx>{MainStyles}</style>
//           <style jsx>{RelayFormStyles}</style>
//           <style jsx>{onboardingStyles}</style>
//         </>
//       );
//     }
//     return children;
//   }
// }

// ErrorBoundary.defaultProps = {
//   organization: undefined
// };

// ErrorBoundary.propTypes = {
//   organization: PropTypes.instanceOf(Object)
// };

// const mapStateToProps = ({ auth: { organization } }) => {
//   return { organization };
// };

// export default connect(mapStateToProps)(ErrorBoundary);
