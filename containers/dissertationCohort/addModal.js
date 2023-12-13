import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { Form, Field } from "react-final-form";

import { required } from "../../lib/objects";
import ImageComponent from "../../components/image";
import { FORM_SUBSCRIPTION } from "../../config/form";
import CloseSVGImage from "../../public/images/close.svg";
import NumberInput from "../../components/inputs/numberInput";
import { showNotification } from "../../components/notification";
import UnassignedSupervisorSearch from "../supervisors/unassignedSupervisorSearch";
import addSupervisorToCohort from "../../actions/supervisors/addSupervisorToCohort";

const AddModal = ({
  auth,
  closeModal,
  mutateResources,
  dissertationCohortId,
}) => {
  const dispatch = useDispatch();

  const onSubmit = (values) => {
    const data = {
      supervisionCohortRequests: [
        {
          userId: values.supervisor.value,
          supervisionSlot: values.supervisionSlot,
        },
      ],
    };

    return dispatch(addSupervisorToCohort(data))
      .then(() => {
        showNotification({
          severity: "success",
          detail: "Supervisor has added to to cohort successfully!",
        });
        mutateResources();
      })
      .catch((err) => {
        showNotification({ detail: err.message || "Something went wrong." });
      })
      .finally(closeModal);
  };

  return (
    <div className="modal-card">
      <header className="modal-card-head">
        <p className="modal-card-title">Add Supervisor To Cohort</p>
        <button
          type="button"
          aria-label="close"
          onClick={closeModal}
          className="close-btn"
        >
          <ImageComponent src={CloseSVGImage} alt="close icon" />
        </button>
      </header>

      <Form
        onSubmit={onSubmit}
        subscription={FORM_SUBSCRIPTION}
        render={({ submitting, handleSubmit, hasValidationErrors }) => {
          return (
            <>
              <section className="modal-card-body">
                <div className="modal-form-content">
                  <div className="field">
                    <div className="control">
                      <Field
                        searchable
                        type="text"
                        auth={auth}
                        id="supervisor"
                        className="input"
                        name="supervisor"
                        validate={required}
                        component={UnassignedSupervisorSearch}
                        dissertationCohortId={dissertationCohortId}
                      />
                    </div>
                  </div>
                  <div className="field">
                    <Field
                      min={1}
                      className="input"
                      validate={required}
                      id="supervisionSlot"
                      name="supervisionSlot"
                      component={NumberInput}
                      labelText="Supervision Slot"
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
                  disabled={submitting || hasValidationErrors}
                  className={`button is-primary${
                    submitting ? " is-loading-custom" : ""
                  }`}
                >
                  Add Supervisor
                </button>
              </footer>
            </>
          );
        }}
      />
    </div>
  );
};

AddModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  mutateResources: PropTypes.func.isRequired,
  auth: PropTypes.instanceOf(Object).isRequired,
};

export default AddModal;
