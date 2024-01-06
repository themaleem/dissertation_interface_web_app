import PropTypes from "prop-types";

import PicImage from "../../../public/images/pic.png";
import ImageComponent from "../../../components/image";
import CloseSVGImage from "../../../public/images/close.svg";
import FileIcon from "../../../public/images/basil_file-solid.svg";
import { getUserInitials } from "../../../lib/objects";

const UserDetailsModal = ({ user, department, closeModal }) => {
  return (
    <div className="modal-card">
      <header className="modal-card-head">
        <p className="modal-card-title">Supervisor detail</p>
        <button
          type="button"
          aria-label="close"
          onClick={closeModal}
          className="close-btn"
        >
          <ImageComponent src={CloseSVGImage} alt="close icon" />
        </button>
      </header>
      <section className="modal-card-body">
        <div className="modal-stacked-content">
          <div className="list-section-list-card-item aligned-tp">
            <div className="list-section-list-card-item-inner">
              <div className="list-section-list-card-initials-wrapper">
                {user.profilePicture ? (
                  <img src={user.profilePicture} alt="user-profile-icon" />
                ) : (
                  getUserInitials(user)
                )}
              </div>
              <div>
                <h6>
                  {user.firstName} {user.lastName}
                </h6>
                <p className="sub">{user.email}</p>
                <p className="sm">{department}</p>
              </div>
            </div>
          </div>
          <div className="list-section-list-card-item aligned-tp">
            <div className="list-section-list-card-item-inner">
              <div className="list-section-list-card-initials-wrapper blu-bg">
                <ImageComponent src={FileIcon} alt="file" />
              </div>
              <div>
                <h6>Research topic</h6>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Aliquam gravida libero ac laoreet vehicula. Sed tortor nunc,
                  mattis vitae ante quis, dignissim lobortis arcu. Integer sed
                  arcu vel libero convallis semper. Aliquam vehicula efficitur
                  accumsan.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer className="modal-card-foot">
        <button
          type="button"
          onClick={closeModal}
          className="button is-primary"
        >
          Close
        </button>
      </footer>
    </div>
  );
};

UserDetailsModal.defaultProps = {};

UserDetailsModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  department: PropTypes.string.isRequired,
  user: PropTypes.instanceOf(Object).isRequired,
};

export default UserDetailsModal;
