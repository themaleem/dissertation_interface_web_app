import cookie from "cookie";
import { useMemo } from "react";
import Router from "next/router";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import useSignOut from "../hooks/useSignOut";
import useIsClient from "../hooks/useIsClient";
import useWithSWR from "../../components/swr/withSwr";
import { getPath, isPathType } from "../../config/urls";
import { ONLY_FOCUS_REVALIDATION } from "../../config/swr";
import getCurrentUser from "../../actions/user/getCurrentUser";

const onAuthPath = (pathname) => isPathType(pathname, "auth");
const onAdminPath = (pathname) => isPathType(pathname, "admin");
const onStaticPath = (pathname) => isPathType(pathname, "static");
const onStudentPath = (pathname) => isPathType(pathname, "student");
const onSupervisorPath = (pathname) => isPathType(pathname, "supervisor");
const onSuperadminPath = (pathname) => isPathType(pathname, "superadmin");

const adminDashboardPath = getPath("adminDashboardPath").href;
const studentDashboardPath = getPath("studentDashboardPath").href;
const supervisorDashboardPath = getPath("supervisorDashboardPath").href;

const dashboardPaths = {
  admin: adminDashboardPath,
  student: studentDashboardPath,
  superadmin: adminDashboardPath,
  supervisor: supervisorDashboardPath,
};

const signInPath = getPath("signInPath").href;

const authWrapper = (WrappedComponent) => {
  const AuthWrapper = (props) => {
    const isClient = useIsClient();

    let redirectTo;

    const pathname = isClient ? Router.pathname : "";

    const { auth, getCurrentUser } = props;

    const { user } = auth;
    const { onSignOut } = useSignOut(auth);

    const fetchOn = () => true;

    const { auid } = isClient ? cookie.parse(document.cookie) : {};

    const baseUrl = useMemo(() => {
      if (!isClient) return undefined;

      if (auid) return getPath("currentUserPath", { id: auid }).as;

      return undefined;
    }, [auid, isClient]);

    useWithSWR({
      fetchOn,
      baseUrl,
      fetcher: getCurrentUser,
      config: ONLY_FOCUS_REVALIDATION,
    });

    const isAdmin = () => user.role === "admin";
    const isStudent = () => user.role === "student";
    const isSuperAdmin = () => user.role === "superadmin";
    const isSupervisor = () => user.role === "supervisor";

    // Handle Redirects
    // User who is unauthenticated but trying to visit an authentication pages.
    // Need to set the link to redirect a user to who tried to visit an authenticated page without signing in
    const noUserAndNotOnAuthPath = () => {
      if (user === null && !onAuthPath(pathname)) {
        const str = window.location.href.substring(
          window.location.origin.length,
        );

        return (redirectTo = signInPath);
      }
      return undefined;
    };

    // Handle Redirects
    // User who is authenticated but trying to visit an auth pages.
    // redirect to homePath
    // todo send user dashboard index page based on role
    const userOnAuthPath = () => {
      if (user !== null && onAuthPath(pathname)) {
        const str = window.location.href.substring(
          window.location.origin.length,
        );

        const userRole = user.role.toLowerCase();
        return (redirectTo = dashboardPaths[userRole]);
      }
      return undefined;
    };

    // if account is inactive, we want to clear their cookie and log them out
    // todo should we inform the user before logging them out?
    const userAccountIsInactive = () => {
      if (!user) return;

      const isActive = user.active;
      // todo add cookie clearing login, and redirect to homepage

      if (!isActive) {
        onSignOut();
        return (redirectTo = signInPath);
      }
    };

    // if you're not superadmin, and you visit superadmin path
    // if you're not admin, and you visit admin path
    const isForbidden = () => {
      if (!isSuperAdmin() && onSuperadminPath(pathname)) {
        const userRole = user.role.toLowerCase();
        return (redirectTo = dashboardPaths[userRole]);
      }

      if ((isStudent() || isSupervisor()) && onAdminPath(pathname)) {
        const userRole = user.role.toLowerCase();
        return (redirectTo = dashboardPaths[userRole]);
      }

      if (isStudent() && !onStudentPath(pathname)) {
        return (redirectTo = studentDashboardPath);
      }

      if (isSupervisor() && !onSupervisorPath(pathname)) {
        return (redirectTo = supervisorDashboardPath);
      }

      return undefined;
    };

    // when user is undefined move on to the component and render the component's skeleton
    // This block will not run on server since user on server will always be undefined per redux default state.
    //  We also don't want to run these checks on static pages.
    if (user !== undefined && pathname && !onStaticPath(pathname)) {
      if (noUserAndNotOnAuthPath()) {
      } else if (user) {
        userOnAuthPath() || isForbidden() || userAccountIsInactive();
      }
    }

    if (redirectTo) Router.push(redirectTo);
    return redirectTo ? null : <WrappedComponent {...props} />;
  };

  function mapStateToProps({ auth, notification }) {
    return { notification, auth };
  }

  AuthWrapper.propTypes = {
    getCurrentUser: PropTypes.func.isRequired,
    auth: PropTypes.instanceOf(Object).isRequired,
  };

  return connect(mapStateToProps, { getCurrentUser })(AuthWrapper);
};

export default authWrapper;
