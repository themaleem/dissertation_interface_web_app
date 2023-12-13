import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { Form, Field } from "react-final-form";

import { required } from "../../../../../lib/objects";
import ImageComponent from "../../../../../components/image";
import { dateWithSlashes } from "../../../../../lib/dateUtils";
import CloseSVGImage from "../../../../../public/images/close.svg";
import { FORM_WITH_DIRTY_VALUES } from "../../../../../config/form";
import CalendarSVG from "../../../../../public/images/calendar.svg";
import AcademicYearSearch from "../academicYear/academicYearSearch";
import { showNotification } from "../../../../../components/notification";
import CalendarInput from "../../../../../components/inputs/calendarInput";
import updateCohort from "../../../../../actions/systemConfig/cohort/updateCohort";

const EditCohortModal = ({ auth, closeModal, mutateResources, cohort }) => {
  const dispatch = useDispatch();

  const { academicYear } = cohort;
  const initialValues = {
    end_date: cohort.endDate,
    start_date: cohort.startDate,
    deadline_date: cohort.supervisionChoiceDeadline,
    academic_year: {
      value: academicYear.id,
      label: `${dateWithSlashes(academicYear.startDate)} - ${dateWithSlashes(
        academicYear.endDate,
      )}`,
    },
  };

  const onSubmit = (values) => {
    const data = {
      id: cohort.id,
      endDate: values.end_date,
      startDate: values.start_date,
      academicYearId: values.academic_year.value,
      supervisionChoiceDeadline: values.deadline_date,
    };

    return dispatch(updateCohort(data))
      .then(() => {
        showNotification({
          severity: "success",
          detail: "Dissertation Cohort has been updated successfully!",
        });
        mutateResources();
      })
      .catch((err) => {
        const errorList = Object.values(err.data?.errors);
        showNotification({
          detail: errorList?.[0]?.[0] || "Something went wrong.",
        });
      })
      .finally(closeModal);
  };

  return (
    <div className="modal-card">
      <header className="modal-card-head">
        <p className="modal-card-title">Edit Dissertation Cohort</p>
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
        initialValues={initialValues}
        subscription={FORM_WITH_DIRTY_VALUES}
        render={({ submitting, dirty, handleSubmit, hasValidationErrors }) => {
          return (
            <>
              <section className="modal-card-body">
                <div className="modal-form-content">
                  <div className="field">
                    <label htmlFor="academic_year"> Academic Year</label>
                    <div className="control">
                      <Field
                        auth={auth}
                        type="text"
                        className="input"
                        id="academic_year"
                        validate={required}
                        name="academic_year"
                        component={AcademicYearSearch}
                      />
                    </div>
                    <div className="control">
                      <Field
                        showIcon
                        type="text"
                        id="startDate"
                        name="start_date"
                        className="input"
                        validate={required}
                        component={CalendarInput}
                      />
                      <label htmlFor="startDate" className="is-active">
                        Start date
                      </label>
                      <ImageComponent
                        src={CalendarSVG}
                        alt="calendar icon"
                        className="calendar-icon"
                      />
                    </div>
                    <div className="control">
                      <Field
                        showIcon
                        type="text"
                        className="input"
                        id="deadlineDate"
                        validate={required}
                        name="deadline_date"
                        component={CalendarInput}
                      />
                      <label htmlFor="deadlineDate" className="is-active">
                        Deadline date
                      </label>
                      <ImageComponent
                        src={CalendarSVG}
                        alt="calendar icon"
                        className="calendar-icon"
                      />
                    </div>

                    <div className="control">
                      <Field
                        showIcon
                        type="text"
                        id="endDate"
                        name="end_date"
                        className="input"
                        validate={required}
                        component={CalendarInput}
                      />
                      <label htmlFor="endDate" className="is-active">
                        End date
                      </label>
                      <ImageComponent
                        src={CalendarSVG}
                        alt="calendar icon"
                        className="calendar-icon"
                      />
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

EditCohortModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  mutateResources: PropTypes.func.isRequired,
  auth: PropTypes.instanceOf(Object).isRequired,
  cohort: PropTypes.instanceOf(Object).isRequired,
};

export default EditCohortModal;
