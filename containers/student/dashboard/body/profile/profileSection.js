import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useRef, useState } from "react";
import { Field, Form } from "react-final-form";
import { serialize as objectToFormData } from "object-to-formdata";

import { FORM_WITH_DIRT } from "../../../../../config/form";
import TextInput from "../../../../../components/inputs/textInput";
import getStudent from "../../../../../actions/student/getStudent";
import updateProfile from "../../../../../actions/auth/updateProfile";
import { required, getUserInitials } from "../../../../../lib/objects";
import UserImageOrInitials from "../../../../common/userImageOrInitials";
import { showNotification } from "../../../../../components/notification";

const ProfileSection = ({
  user,
  course,
  afterRequest,
  updateProfile,
  profilePictureUrl,
}) => {
  const [avatarUrl, setAvatarUrl] = useState(profilePictureUrl);
  const [showEditProfile, setShowEditProfile] = useState(false);

  const fileInputRef = useRef(null);

  const toggleEditProfile = () => {
    setShowEditProfile((state) => !state);
    setAvatarUrl(profilePictureUrl);
  };

  const profileFormInitialRequest = {
    last_name: user.lastName,
    first_name: user.firstName,
  };

  const updateStudentProfile = (values) => {
    const payload = objectToFormData({
      file: avatarUrl,
      lastName: values.last_name,
      firstName: values.first_name,
    });

    return updateProfile(payload)
      .then(() => {
        toggleEditProfile();
        afterRequest();
        showNotification({
          severity: "success",
          detail: "Profile updated",
        });
      })
      .catch((err) => {
        showNotification({ detail: err.message });
      });
  };

  const handleAvatarChange = (event) => {
    if (event.target.files[0]) {
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        setAvatarUrl(e.target.result);
      };
      fileReader.readAsDataURL(event.target.files[0]);
    }
  };

  const triggerFileSelectPopup = () => {
    fileInputRef.current.click();
  };

  return showEditProfile ? (
    <div className="list-section-list-card-item no-flex">
      <div className="list-section-list-card-item-inner aligned--center">
        <div
          onClick={triggerFileSelectPopup}
          className="list-section-list-card-initials-wrapper lg avatar"
        >
          {profilePictureUrl || avatarUrl ? (
            <img src={avatarUrl} alt="s" />
          ) : (
            getUserInitials(user)
          )}
          <div className="edit-overlay">Edit</div>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleAvatarChange}
            accept="image/png, image/jpeg, image/gif"
          />
        </div>
        <button
          type="button"
          className="button"
          onClick={triggerFileSelectPopup}
        >
          Upload
        </button>
      </div>
      <Form
        subscription={FORM_WITH_DIRT}
        onSubmit={updateStudentProfile}
        initialValues={profileFormInitialRequest}
        render={({ dirty, submitting, handleSubmit, hasValidationErrors }) => {
          return (
            <form autoComplete="off">
              <div className="field-group">
                <div className="field">
                  <Field
                    type="text"
                    id="firstName"
                    className="input"
                    name="first_name"
                    validate={required}
                    component={TextInput}
                    labelText="First Name"
                  />
                </div>
                <div className="field">
                  <Field
                    type="text"
                    id="lastName"
                    name="last_name"
                    className="input"
                    validate={required}
                    labelText="Last Name"
                    component={TextInput}
                  />
                </div>
              </div>
              <div className="field">
                <div className="custom-control">
                  <label htmlFor="email">Email address: </label>
                  <input
                    disabled
                    id="email"
                    type="text"
                    className="input"
                    autoComplete="off"
                    defaultValue={user.email}
                  />
                </div>
              </div>
              <div className="field">
                <div className="custom-control">
                  <label htmlFor="course">Course: </label>
                  <input
                    disabled
                    id="course"
                    type="text"
                    className="input"
                    autoComplete="off"
                    defaultValue={course.name}
                  />
                </div>
              </div>
              <div className="field-footer">
                <div className="btn-group">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className={`button is-primary is-lg${
                      submitting ? " is-loading-custom" : ""
                    }`}
                    disabled={hasValidationErrors || !dirty || submitting}
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={toggleEditProfile}
                    className="button is-primary is-lg no-bg"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          );
        }}
      />
    </div>
  ) : (
    <div className="list-section-list-card-item aligned-tp">
      <div className="list-section-list-card-item-inner">
        <div className="list-section-list-card-initials-wrapper">
          <UserImageOrInitials user={user} profilePicture={avatarUrl} />
        </div>
        <div>
          <h6>
            {user.firstName} {user.lastName}
          </h6>
          <p className="sub">{user.email}</p>
          <p className="sm">{course.name}</p>
        </div>
      </div>
      <button type="button" className="button" onClick={toggleEditProfile}>
        Edit
      </button>
    </div>
  );
};
ProfileSection.defaultProps = {
  profilePictureUrl: null,
};

ProfileSection.propTypes = {
  profilePictureUrl: PropTypes.string,
  afterRequest: PropTypes.func.isRequired,
  updateProfile: PropTypes.func.isRequired,
  user: PropTypes.instanceOf(Object).isRequired,
  course: PropTypes.instanceOf(Object).isRequired,
};

export default connect(null, { getStudent, updateProfile })(ProfileSection);
