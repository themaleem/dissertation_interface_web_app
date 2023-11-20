import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { Form, Field } from "react-final-form";

import { required } from "../../../../lib/objects";
import ImageComponent from "../../../../components/image";
import CloseSVGImage from "../../../../public/images/close.svg";
import { FORM_WITH_DIRTY_VALUES } from "../../../../config/form";
import CalendarSVG from "../../../../public/images/calendar.svg";
import EmailInput from "../../../../components/inputs/emailInput";
import updateAcademicYear from "../../../../actions/systemConfig/updateAcademicYear";
import { showNotification } from "../../../../reducers/notification/notificationReducer";
import CalendarInput from "../../../../components/inputs/calendarInput";

const EditModal = ({ auth, closeModal, mutateResources, academicYear }) => {
  const dispatch = useDispatch();

  const initialValues = {
    start_date: academicYear.startDate,
    end_date: academicYear.endDate,
  };

  const onSubmit = (values) => {
    const data = {
      id: academicYear.id,
      endDate: values.end_date,
      startDate: values.start_date,
    };

    return dispatch(updateAcademicYear(data))
      .then(() => {
        dispatch(
          showNotification("Academic Year has been updated successfully!"),
        );
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
        <p className="modal-card-title">Edit Academic Year</p>
        <button
          type="button"
          aria-label="close"
          onClick={closeModal}
          className="close-btn"
        >
          <ImageComponent src={CloseSVGImage} />
        </button>
      </header>

      <Form
        onSubmit={onSubmit}
        initialValues={initialValues}
        subscription={FORM_WITH_DIRTY_VALUES}
        render={({ dirty, submitting, handleSubmit, hasValidationErrors }) => {
          return (
            <>
              <section className="modal-card-body">
                <div className="modal-form-content">
                  <div className="control">
                    <Field
                      showIcon
                      id="start_date"
                      className="input"
                      name="start_date"
                      validate={required}
                      component={CalendarInput}
                    />
                    <label htmlFor="startDate"> Start date</label>

                    {/* <ImageComponent src={CalendarSVG} alt="calendar icon" /> */}
                  </div>
                  <div className="control">
                    <Field
                      showIcon
                      id="end_date"
                      name="end_date"
                      className="input"
                      validate={required}
                      component={CalendarInput}
                    />
                    <label htmlFor="endDate"> End date</label>

                    {/* <ImageComponent src={CalendarSVG} alt="calendar icon" /> */}
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
  academicYear: PropTypes.instanceOf(Object).isRequired,
};

export default EditModal;
