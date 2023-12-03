import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { Form, Field } from "react-final-form";

import { required } from "../../../lib/objects";
import ImageComponent from "../../../components/image";
import { toDayMonthYearLong } from "../../../lib/dateUtils";
import CloseSVGImage from "../../../public/images/close.svg";
import { FORM_WITH_DIRTY_VALUES } from "../../../config/form";
import TextInput from "../../../components/inputs/textInput";
import EmailInput from "../../../components/inputs/emailInput";
import { showNotification } from "../../../reducers/notification/notificationReducer";
import updateSupervisorInvite from "../../../actions/supervisors/updateSupervisorInvite";

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
    staff_id: invitation.staffId,
    last_name: invitation.lastName,
    first_name: invitation.firstName,
  };

  const onSubmit = (values) => {
    const data = {
      id: invitation.id,
      email: values.email,
      staffId: values.staff_id,
      lastName: values.last_name,
      firstName: values.first_name,
    };

    return dispatch(updateSupervisorInvite(data))
      .then(() => {
        dispatch(
          showNotification("Invitation has been modified successfully!"),
        );
        mutateResources();
      })
      .catch((err) => {
        console.log(err);
        // const errorList = Object.values(err.data?.errors);
        // dispatch(
        //   showNotification(errorList?.[0]?.[0] || "Something went wrong."),
        // );
      })
      .finally(closeModal);
  };

  return (
    <div className="modal-card">
      <header className="modal-card-head">
        <p className="modal-card-title">
          {modalType === "details"
            ? "Supervisor Invitation"
            : "Edit Supervisor Invitation"}
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
                  <p className="text-key">Staff ID:</p>
                  <p className="text-val">{invitation.staffId}</p>
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
                        id="staffId"
                        name="staff_id"
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
