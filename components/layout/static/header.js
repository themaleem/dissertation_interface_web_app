import Link from "next/link";
import PropTypes from "prop-types";

import Image from "../../image";
import { getPath } from "../../../config/urls";
import Logo from "../../../public/images/logo.svg";
import useSignOut from "../../../containers/hooks/useSignOut";

const homePath = getPath("homePath").href;
const signInPath = getPath("signInPath").href;

const Header = ({ auth }) => {
  const { onSignOut } = useSignOut(auth);

  const onLogoutClick = async () => {
    onSignOut();
  };

  const renderSignInButton = (className) => {
    return auth.user ? (
      <a onClick={onLogoutClick} className={className}>
        {auth.signingOut ? "Logging Out" : "Logout"}
      </a>
    ) : (
      <Link href={signInPath} className={className}>
        Sign In
      </Link>
    );
  };

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
        <div id="" className="resp-menu">
          <div className="navbar-end">
            <div className="navbar-item">
              <Link
                href={homePath}
                className="navbar-link is-arrowless is-active"
              >
                Home
              </Link>
            </div>
            <div className="navbar-item">
              <Link className="navbar-link is-arrowless" href={homePath}>
                FAQs
              </Link>
            </div>
            <div className="navbar-item">{renderSignInButton("button")}</div>
          </div>
        </div>
      </div>
    </nav>
  );
};

Header.propTypes = { auth: PropTypes.instanceOf(Object).isRequired };

export default Header;
