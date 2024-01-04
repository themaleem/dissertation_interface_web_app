import Link from "next/link";
import PropTypes from "prop-types";
import { useRouter } from "next/router";

import ImageComponent from "../image";
import { getPath } from "../../config/urls";
import { onChooseRole } from "../../lib/auth";
import Logo from "../../public/images/logo.svg";
import useSignOut from "../../containers/hooks/useSignOut";
import CaretImage from "../../public/images/carret-fr.svg";
import BackArrowImage from "../../public/images/back-arrow.svg";
import FrontArrowImage from "../../public/images/front-arrow.svg";
import SupervisorImage from "../../public/images/supervisor.svg";
import { dashboardPaths } from "../../containers/hoc/authWrapper";
import AdminstratorImage from "../../public/images/administrator.svg";

const homePath = getPath("homePath").href;

const ChooseRole = ({ auth }) => {
  const router = useRouter();

  const handleChooseRole = (role) => {
    onChooseRole({ activeRole: role });
    return router.push(dashboardPaths[role]);
  };

  const { onSignOut } = useSignOut(auth);

  const onLogoutClick = async () => {
    onSignOut();
  };

  return (
    <section className="form-wrapper">
      <div className="form-card-wrapper">
        <div>
          <div className="form-card">
            <div className="form-card-header">
              <Link
                passHref
                href={homePath}
                className="form-card-nav-link is-flex is-align-items-center"
              >
                <ImageComponent alt="back-arrow" src={BackArrowImage} />
                Back to home
              </Link>
              <div className="form-card-nav-link-inner">
                <h3>Sign in</h3>
                <ImageComponent
                  src={Logo}
                  alt="logo"
                  className="form-card-logo"
                />
              </div>
              <form className="form-container" autoComplete="off">
                <p className="form-container-sub-text">
                  Hi <b>{auth.user?.firstName}</b>, please choose what role you
                  would like to access.
                </p>
                <div className="form-select-list">
                  <div
                    className="form-select-list-item"
                    onClick={() => handleChooseRole("supervisor")}
                  >
                    <ImageComponent src={SupervisorImage} alt="supervisor" />
                    <div className="form-select-list-clickable is-flex is-justify-content-space-between">
                      <h6>Supervisor</h6>
                      <ImageComponent src={CaretImage} alt="caret-icon" />
                    </div>
                  </div>
                  <div
                    className="form-select-list-item"
                    onClick={() => handleChooseRole("admin")}
                  >
                    <ImageComponent
                      alt="adminstrator"
                      src={AdminstratorImage}
                    />
                    <div className="form-select-list-clickable is-flex is-justify-content-space-between">
                      <h6>Administrator</h6>
                      <ImageComponent src={CaretImage} alt="caret-icon" />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="form-card-bt-strip">
            <p>Not your account?</p>
            <a onClick={onLogoutClick} className="is-flex is-align-item-center">
              Log out
              <ImageComponent src={FrontArrowImage} alt="front-arrow-icon" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

ChooseRole.propTypes = {
  auth: PropTypes.instanceOf(Object).isRequired,
};

export default ChooseRole;
