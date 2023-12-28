import { useState } from "react";
import PropTypes from "prop-types";
import Skeleton from "react-loading-skeleton";
import OutsideClickHandler from "react-outside-click-handler";

import Suspense from "../../suspense";
import ImageComponent from "../../image";
import { onChooseRole } from "../../../lib/auth";
import { getUserInitials } from "../../../lib/objects";
import useSignOut from "../../../containers/hooks/useSignOut";
import CheckIconSVG from "../../../public/images/ci_checkbox-check.svg";

const ProfileDropdown = ({ auth }) => {
  const [openDropdown, setOpenDropdown] = useState(false);

  const { onSignOut } = useSignOut(auth);

  const onLogoutClick = async () => {
    onSignOut();
  };

  const toggleDropdown = () => setOpenDropdown(!openDropdown);

  const renderInitial = () => (
    <div className="navbar-item">
      <div
        className={`dropdown nav-avatar-dropdown is-right ${
          openDropdown ? " is-active" : ""
        }`}
      >
        <OutsideClickHandler onOutsideClick={() => setOpenDropdown(false)}>
          <div className="dropdown-trigger" onClick={toggleDropdown}>
            <div className="initials-wrapper">{getUserInitials(auth.user)}</div>
          </div>
          <div className="dropdown-menu" id="dropdown-menu2" role="menu">
            <div className="dropdown-content">
              <div className="bg-blur" />
              <div className="list-section-list-card-item aligned-tp">
                <div className="list-section-list-card-item-inner">
                  <div className="list-section-list-card-initials-wrapper">
                    {getUserInitials(auth.user)}
                  </div>
                  <div>
                    <h6>
                      {auth.user.firstName} {auth.user.lastName}
                    </h6>
                    <p className="sub">{auth.user.email}</p>
                  </div>
                </div>
              </div>
              {auth.user.roles.length > 1 && (
                <div className="dropdown-item-content">
                  <h6>Switch roles</h6>

                  {auth.user.roles.map((role) => {
                    const isActiveRole =
                      role.toLowerCase() === auth.user.activeRole;
                    return (
                      <div
                        key={role}
                        className={`dropdwon-item${
                          isActiveRole ? " is-active" : ""
                        }`}
                        onClick={() =>
                          onChooseRole({ activeRole: role.toLowerCase() })
                        }
                      >
                        {role}
                        {isActiveRole && (
                          <ImageComponent
                            src={CheckIconSVG}
                            alt="active-icon"
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
              <div className="dropdown-footer">
                <button
                  type="button"
                  className="button"
                  onClick={onLogoutClick}
                  disabled={auth.signingOut}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </OutsideClickHandler>
      </div>
    </div>
  );

  const renderInitialSkeleton = () => (
    <div className="navbar-item">
      <Skeleton circle height={48} width={48} className="initials-wrapper" />
    </div>
  );

  return (
    <Suspense
      auth={auth}
      component={renderInitial}
      skeleton={renderInitialSkeleton}
    />
  );
};

ProfileDropdown.propTypes = {
  auth: PropTypes.instanceOf(Object).isRequired,
};

export default ProfileDropdown;
