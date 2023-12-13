import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { Form, Field } from "react-final-form";

import { required } from "../../../lib/objects";
import ImageComponent from "../../../components/image";
import { toDayMonthYearLong } from "../../../lib/dateUtils";
import CloseSVGImage from "../../../public/images/close.svg";
import TextInput from "../../../components/inputs/textInput";
import { FORM_WITH_DIRTY_VALUES } from "../../../config/form";
import EmailInput from "../../../components/inputs/emailInput";
import { showNotification } from "../../../components/notification";
import updateStudentInvite from "../../../actions/students/updateStudentInvite";

const DetailsModal = ({
  modalType,
  invitation,
  closeModal,
  setModalType,
  mutateResources,
}) => {
  const dispatch = useDispatch();

  const initialValues = {
    email: invitation.email,
    last_name: invitation.lastName,
    student_id: invitation.studentId,
    first_name: invitation.firstName,
  };

  const onSubmit = (values) => {
    const data = {
      id: invitation.id,
      email: values.email,
      lastName: values.last_name,
      studentId: values.student_id,
      firstName: values.first_name,
    };

    return dispatch(updateStudentInvite(data))
      .then(() => {
        showNotification({
          severity: "success",
          detail: "Invitation has been modified successfully!",
        });
        mutateResources();
      })
      .catch((err) => {
        console.log(err);
        // const errorList = Object.values(err.data?.errors);
        // showNotification({detail:errorList?.[0]?.[0] || "Something went wrong."})
      })
      .finally(closeModal);
  };

  return (
    <div className="modal-card">
      <header className="modal-card-head">
        <p className="modal-card-title">
          {modalType === "details"
            ? "Student Invitation"
            : "Edit Student Invitation"}
        </p>
        <button
          type="button"
          aria-label="close"
          className="close-btn"
          onClick={closeModal}
        >
          <ImageComponent src={CloseSVGImage} alt="close-icon" />
        </button>
      </header>
      {modalType === "details" ? (
        <>
          <section className="modal-card-body">
            <div className="modal-form-content">
              <div className="text-content-block">
                <div className="is-flex text-declartn is-align-item-center">
                  <p className="text-key">Name:</p>
                  <p className="text-val">
                    {invitation.firstName} {invitation.lastName}
                  </p>
                </div>
                <div className="is-flex text-declartn is-align-item-center">
                  <p className="text-key">Student ID:</p>
                  <p className="text-val">{invitation.studentId}</p>
                </div>
                <div className="is-flex text-declartn is-align-item-center">
                  <p className="text-key">Email:</p>
                  <p className="text-val">{invitation.email}</p>
                </div>
                <div className="is-flex text-declartn is-align-item-center">
                  <p className="text-key">Expire by:</p>
                  <p className="text-val">
                    {toDayMonthYearLong(invitation.expiryDate)}
                  </p>
                </div>
              </div>
            </div>
          </section>
          <footer className="modal-card-foot left">
            <button
              type="button"
              className="button text-blue is-white"
              onClick={() => setModalType("edit")}
            >
              Edit details
            </button>
            <button
              type="button"
              onClick={closeModal}
              className="button is-white text-red"
            >
              Close
            </button>
          </footer>
        </>
      ) : (
        <Form
          onSubmit={onSubmit}
          initialValues={initialValues}
          subscription={FORM_WITH_DIRTY_VALUES}
          render={({
            form,
            dirty,
            submitting,
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
                        labelText="Enter email address"
                      />
                    </div>
                    <div className="field">
                      <Field
                        type="text"
                        id="studentId"
                        name="student_id"
                        className="input"
                        validate={required}
                        component={TextInput}
                        labelText="Student ID"
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
      )}
    </div>
  );
};

DetailsModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  modalType: PropTypes.string.isRequired,
  setModalType: PropTypes.func.isRequired,
  mutateResources: PropTypes.func.isRequired,
  invitation: PropTypes.instanceOf(Object).isRequired,
};

export default DetailsModal;
