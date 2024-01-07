import PropTypes from "prop-types";
import { useCallback, useState } from "react";

import ModalWrapper from "../../components/modal";
import UserDetailsModal from "./userCardDetailsModal";
import ImageComponent from "../../components/image";
import { getUserInitials } from "../../lib/objects";
import CaretForwardImage from "../../public/images/caret-forward.svg";

const UserCard = ({ user, department }) => {
  const [openDetailsModal, setOpenDetailsModal] = useState(false);

  const toggleDetailsModal = useCallback(() => {
    return setOpenDetailsModal((open) => !open);
  }, []);

  const renderModal = () => {
    return (
      <ModalWrapper open={openDetailsModal} closeModal={toggleDetailsModal}>
        <UserDetailsModal
          user={user}
          department={department}
          closeModal={toggleDetailsModal}
        />
      </ModalWrapper>
    );
  };

  return (
    <>
      {renderModal()}
      <div
        // onClick={toggleDetailsModal}
        className="list-section-list-card-item"
      >
        <div className="list-section-list-card-item-inner">
          <div className="list-section-list-card-initials-wrapper">
            {getUserInitials(user)}
          </div>
          <div>
            <h6>
              {user.firstName} {user.lastName}
            </h6>
            <p>{department}</p>
          </div>
        </div>
        <ImageComponent src={CaretForwardImage} alt="caret-forward" />
      </div>
    </>
  );
};

UserCard.propTypes = {
  department: PropTypes.string.isRequired,
  user: PropTypes.instanceOf(Object).isRequired,
};

export default UserCard;
