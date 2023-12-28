import Link from "next/link";
import PropTypes from "prop-types";
import { useRouter } from "next/router";

import Image from "../../image";
import { getPath } from "../../../config/urls";
import ProfileDropdown from "./profileDropdown";
import Logo from "../../../public/images/logo.svg";

const homePath = getPath("homePath").href;
const supervisorDashboardPath = getPath("supervisorDashboardPath").href;

const paths = [
  { name: "Dashboard", path: supervisorDashboardPath },
  { name: "Students", path: "#" },
  { name: "Requests", path: "#" },
];

const SupervisorHeader = ({ auth }) => {
  const router = useRouter();

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
            {paths.map((item) => {
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

SupervisorHeader.propTypes = { auth: PropTypes.instanceOf(Object).isRequired };

export default SupervisorHeader;
