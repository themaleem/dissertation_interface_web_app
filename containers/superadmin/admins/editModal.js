import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { Form, Field } from "react-final-form";

import { required } from "../../../lib/objects";
import ImageComponent from "../../../components/image";
import TextInput from "../../../components/inputs/textInput";
import CloseSVGImage from "../../../public/images/close.svg";
import { FORM_WITH_DIRTY_VALUES } from "../../../config/form";
import EmailInput from "../../../components/inputs/emailInput";
import { showNotification } from "../../../components/notification";
import updateAdminUser from "../../../actions/superadmin/updateAdminUser";

const EditModal = ({ auth, closeModal, userType, mutateResources, user }) => {
  const dispatch = useDispatch();

  const initialValues = {
    email: user.email,
    username: user.userName,
    last_name: user.lastName,
    first_name: user.firstName,
  };

  const onSubmit = (values) => {
    const data = {
      userId: user.id,
      email: values.email,
      userName: values.username,
      lastName: values.last_name,
      firstName: values.first_name,
    };

    return dispatch(updateAdminUser(data))
      .then(() => {
        showNotification({
          severity: "success",
          detail: `${userType} account has updated successfully!`,
        });
        mutateResources();
      })
      .catch((err) => {
        showNotification(err.message);
      })
      .finally(closeModal);
  };

  return (
    <div className="modal-card">
      <header className="modal-card-head">
        <p className="modal-card-title">Edit {userType}</p>
        <button
          type="button"
          onClick={closeModal}
          className="close-btn"
          aria-label="close"
        >
          <ImageComponent src={CloseSVGImage} alt="close icon" />
        </button>
      </header>

      <Form
        onSubmit={onSubmit}
        initialValues={initialValues}
        subscription={FORM_WITH_DIRTY_VALUES}
        render={({
          form,
          submitting,
          dirty,
          handleSubmit,
          hasValidationErrors,
        }) => {
          return (
            <>
              <section className="modal-card-body">
                <div className="modal-form-content">
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
                        component={TextInput}
                        labelText="Last Name"
                      />
                    </div>
                  </div>
                  <div className="field">
                    <EmailInput
                      id="email"
                      isShuEmail
                      validateField
                      className="input"
                      change={form.change}
                      disabled={user.emailConfirmed}
                      labelText="Enter email address"
                    />
                  </div>
                  <div className="field">
                    <Field
                      type="text"
                      id="username"
                      name="username"
                      className="input"
                      validate={required}
                      labelText="Staff ID"
                      component={TextInput}
                    />
                  </div>
                </div>
              </section>
              <footer className="modal-card-foot">
                <button type="button" onClick={closeModal} className="button">
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={submitting || !dirty || hasValidationErrors}
                  className={`button is-primary${
                    submitting ? " is-loading-custom" : ""
                  }`}
                >
                  Update
                </button>
              </footer>
            </>
          );
        }}
      />
    </div>
  );
};

EditModal.defaultProps = {
  userType: "Admin",
};

EditModal.propTypes = {
  userType: PropTypes.string,
  closeModal: PropTypes.func.isRequired,
  mutateResources: PropTypes.func.isRequired,
  auth: PropTypes.instanceOf(Object).isRequired,
};

export default EditModal;
