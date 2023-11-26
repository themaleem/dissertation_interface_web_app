import Link from "next/link";
import { useMemo } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import Skeleton from "react-loading-skeleton";

import Image from "../../image";
import Suspense from "../../suspense";
import { getPath } from "../../../config/urls";
import Logo from "../../../public/images/logo.svg";
import { getUserInitials } from "../../../lib/objects";

const homePath = getPath("homePath").href;
const adminUsersPath = getPath("adminUsersPath").href;
const adminDashboardPath = getPath("adminDashboardPath").href;
const systemConfigurationPath = getPath("systemConfigurationPath").href;

const paths = [
  { name: "Dashboard", path: adminDashboardPath },
  { name: "Manage Admins", path: adminUsersPath, type: "superadmin" },
  { name: "System configuration", path: systemConfigurationPath },
  { name: "Students", path: "#" },
  { name: "Supervisors", path: "#" },
  { name: "Requests", path: "#" },
];

const Header = ({ auth }) => {
  const isSuperadmin = useMemo(() => {
    if (!auth.user) return undefined;

    return auth.user.role === "superadmin";
  }, [auth.user]);

  const router = useRouter();

  const isSystemConfigPage = useMemo(() => {
    return systemConfigurationPath === router.pathname.split("/", 3).join("/");
  }, [router.pathname]);

  const renderInitial = () => (
    <div className="navbar-item">
      <div className="initials-wrapper">{getUserInitials(auth.user)}</div>
    </div>
  );

  const renderInitialSkeleton = () => (
    <div className="navbar-item">
      <Skeleton circle height={48} width={48} className="initials-wrapper" />
    </div>
  );

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="container">
        <div className="navbar-left-items">
          <div className="menu-burger">
            <span />
            <span />
            <span />
          </div>
          <div className="navbar-brand">
            <Link className="navbar-item" href={homePath}>
              <Image alt="logo" src={Logo} className="logo" />
            </Link>
          </div>
        </div>
        <div className="resp-menu">
          <div className="navbar-end">
            {paths.map((item, index) => {
              if (item.type === "superadmin" && !isSuperadmin) return null;

              if (index === 2 && isSystemConfigPage) {
                return (
                  <div key={item.name} className="navbar-item">
                    <Link
                      href={item.path}
                      className="navbar-link is-arrowless is-active"
                    >
                      {item.name}
                    </Link>
                  </div>
                );
              }

              return (
                <div key={item.name} className="navbar-item">
                  <Link
                    href={item.path}
                    className={`navbar-link is-arrowless${
                      router.pathname === item.path ? " is-active" : ""
                    }`}
                  >
                    {item.name}
                  </Link>
                </div>
              );
            })}
            <Suspense
              auth={auth}
              component={renderInitial}
              skeleton={renderInitialSkeleton}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

Header.propTypes = { auth: PropTypes.instanceOf(Object).isRequired };

export default Header;
