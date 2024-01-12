import PropTypes from "prop-types";

import { getUserInitials } from "../../lib/objects";

const UserImageOrInitials = ({ profilePictureData, user }) => {
  return profilePictureData?.imageData ? (
    <img src={profilePictureData?.imageData} alt="user-profile-icon" />
  ) : (
    getUserInitials(user)
  );
};

UserImageOrInitials.propTypes = {
  user: PropTypes.instanceOf(Object).isRequired,
  profilePictureData: PropTypes.string.isRequired,
};

export default UserImageOrInitials;
