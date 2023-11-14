import cookie from "cookie";
import { useMemo } from "react";
import Router from "next/router";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import useWithSWR from "../../components/swr/withSwr";
import { getPath, isPathType } from "../../config/urls";
import { ONLY_FOCUS_REVALIDATION } from "../../config/swr";
import useIsClient from "../../components/hooks/useIsClient";
import getCurrentUser from "../../actions/user/getCurrentUser";

const onAuthPath = (pathname) => isPathType(pathname, "auth");
const onAdminPath = (pathname) => isPathType(pathname, "admin");
const onStaticPath = (pathname) => isPathType(pathname, "static");
const onSuperadminPath = (pathname) => isPathType(pathname, "superadmin");

const homePath = getPath("homePath").href;
const signInPath = getPath("signInPath").href;

const authWrapper = (WrappedComponent) => {
  const AuthWrapper = (props) => {
    const isClient = useIsClient();

    let redirectTo;

    const pathname = isClient ? Router.pathname : "";

    const {
      getCurrentUser,
      auth: { user },
    } = props;

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
      if (!user && !onAuthPath(pathname)) {
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
    // todo dashboard index page based on role
    const userOnAuthPath = () => {
      if (user !== null && onAuthPath(pathname)) {
        const str = window.location.href.substring(
          window.location.origin.length,
        );

        return (redirectTo = homePath);
      }
      return undefined;
    };

    // if account is inactive, we want to clear their cookie and log them out
    // todo should we inform them before logging them out?
    const userAccountIsInactive = () => {
      if (!user) return;

      const userStatus = user.role;
      // todo add cookie clearing login, and redirect to homepage
      // if (userStatus === "active"){ return (redirectTo = homePath);}
    };

    // if you're not superadmin, and you visit superadmin path
    // if you're not admin, and you visit admin path
    const isForbidden = () => {
      if (!isSuperAdmin() && onSuperadminPath(pathname)) {
        return (redirectTo = homePath);
      }

      if ((isStudent() || isSupervisor()) && onAdminPath(pathname)) {
        return (redirectTo = homePath);
      }

      return undefined;
    };

    // when user is undefined move on to the component and render the component's skeleton
    // This block will not run on server since user on server will always be undefined  and per redux default state.
    //  We also don't want to run these checks on static pages.
    // @todo test more
    if (user !== null && pathname && !onStaticPath(pathname)) {
      if (noUserAndNotOnAuthPath()) {
      } else if (user) {
        userOnAuthPath() || userAccountIsInactive() || isForbidden();
      }
    }

    // return <WrappedComponent {...props} />;

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
