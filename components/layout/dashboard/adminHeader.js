import Link from "next/link";
import { useMemo } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";

import Image from "../../image";
import { getPath } from "../../../config/urls";
import Logo from "../../../public/images/logo.svg";
import ProfileDropdown from "./profileDropdown";

const homePath = getPath("homePath").href;
const studentsPath = getPath("studentsPath").href;
const adminUsersPath = getPath("adminUsersPath").href;
const supervisorsPath = getPath("supervisorsPath").href;
const adminDashboardPath = getPath("adminDashboardPath").href;
const supervisionRequestsPath = getPath("supervisionRequestsPath").href;
const systemConfigurationPath = getPath("systemConfigurationPath").href;

const paths = [
  { name: "Dashboard", path: adminDashboardPath },
  { name: "Manage Admins", path: adminUsersPath, type: "superadmin" },
  { name: "System configuration", path: systemConfigurationPath },
  { name: "Students", path: studentsPath },
  { name: "Supervisors", path: supervisorsPath },
  { name: "Requests", path: supervisionRequestsPath },
];

const AdminHeader = ({ auth }) => {
  const isSuperadmin = useMemo(() => {
    if (!auth.user) return undefined;

    return auth.user.activeRole === "superadmin";
  }, [auth.user]);

  const router = useRouter();

  const isSystemConfigPage = useMemo(() => {
    return systemConfigurationPath === router.pathname.split("/", 3).join("/");
  }, [router.pathname]);

  const isSupervisorPath = useMemo(() => {
    return supervisorsPath === router.pathname.split("/", 2).join("/");
  }, [router.pathname]);

  const isStudentPath = useMemo(() => {
    return studentsPath === router.pathname.split("/", 2).join("/");
  }, [router.pathname]);

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

              if (index === 3 && isStudentPath) {
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

              if (index === 4 && isSupervisorPath) {
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
            <ProfileDropdown auth={auth} />
          </div>
        </div>
      </div>
    </nav>
  );
};

AdminHeader.propTypes = { auth: PropTypes.instanceOf(Object).isRequired };

export default AdminHeader;
