import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { Form, Field } from "react-final-form";

import { required } from "../../../lib/objects";
import ImageComponent from "../../../components/image";
import TextInput from "../../../components/inputs/textInput";
import CloseSVGImage from "../../../public/images/close.svg";
import { FORM_WITH_DIRTY_VALUES } from "../../../config/form";
import EmailInput from "../../../components/inputs/emailInput";
import updateAdminUser from "../../../actions/superadmin/updateAdminUser";
import { showNotification } from "../../../reducers/notification/notificationReducer";

const EditModal = ({ auth, closeModal, mutateResources, user }) => {
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
        dispatch(showNotification("Admin account has updated successfully!"));
        mutateResources();
      })
      .catch((err) => {
        dispatch(showNotification(err.message));
      })
      .finally(closeModal);
  };

  return (
    <div className="modal-card">
      <header className="modal-card-head">
        <p className="modal-card-title">Edit admin</p>
        <button
          type="button"
          onClick={closeModal}
          className="close-btn"
          aria-label="close"
        >
          <ImageComponent src={CloseSVGImage} />
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
                      <div className="control">
                        <Field
                          type="text"
                          id="firstName"
                          className="input"
                          name="first_name"
                          validate={required}
                          component={TextInput}
                        />
                        <label htmlFor="firstName"> First name </label>
                      </div>
                    </div>
                    <div className="field">
                      <div className="control">
                        <Field
                          type="text"
                          id="lastName"
                          name="last_name"
                          className="input"
                          validate={required}
                          component={TextInput}
                        />
                        <label htmlFor="lastName"> Last name </label>
                      </div>
                    </div>
                  </div>
                  <div className="field">
                    <div className="control">
                      <EmailInput
                        id="email"
                        isShuEmail
                        validateField
                        className="input"
                        change={form.change}
                        disabled={user.emailConfirmed}
                      />
                      <label htmlFor="email"> Enter email address </label>
                    </div>
                  </div>
                  <div className="field">
                    <div className="control">
                      <Field
                        type="text"
                        id="username"
                        name="username"
                        className="input"
                        validate={required}
                        component={TextInput}
                      />
                      <label htmlFor="username"> Staff ID </label>
                    </div>
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

EditModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  mutateResources: PropTypes.func.isRequired,
  auth: PropTypes.instanceOf(Object).isRequired,
};

export default EditModal;
