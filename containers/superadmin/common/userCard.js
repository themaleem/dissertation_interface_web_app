import PropTypes from "prop-types";

import ImageComponent from "../../../components/image";
import CaretForwardImage from "../../../public/images/caret-forward.svg";
import { getUserInitials } from "../../../lib/objects";

const UserCard = ({ user, department }) => {
  return (
    <div className="list-section-list-card-item">
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
  );
};

UserCard.propTypes = {
  department: PropTypes.string.isRequired,
  user: PropTypes.instanceOf(Object).isRequired,
};

export default UserCard;
