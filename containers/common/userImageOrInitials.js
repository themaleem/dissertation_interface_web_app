import PropTypes from "prop-types";

import { getUserInitials } from "../../lib/objects";

const UserImageOrInitials = ({ profilePicture, user }) => {
  return profilePicture ? (
    <img src={profilePicture} alt="user-profile-icon" />
  ) : (
    getUserInitials(user)
  );
};

UserImageOrInitials.propTypes = {
  profilePicture: PropTypes.string.isRequired,
  user: PropTypes.instanceOf(Object).isRequired,
};

export default UserImageOrInitials;
