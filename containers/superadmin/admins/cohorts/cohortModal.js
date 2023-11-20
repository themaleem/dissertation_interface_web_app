import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { Form, Field } from "react-final-form";

import { required } from "../../../../lib/objects";
import ImageComponent from "../../../../components/image";
import { dateWithSlashes } from "../../../../lib/dateUtils";
import CloseSVGImage from "../../../../public/images/close.svg";
import { FORM_WITH_DIRTY_VALUES } from "../../../../config/form";
import CalendarInput from "../../../../components/inputs/calendarInput";
import AcademicYearSearch from "../systemConfiguration/academicYearSearch";
import updateCohort from "../../../../actions/systemConfig/cohort/updateCohort";
import { showNotification } from "../../../../reducers/notification/notificationReducer";

const CohortModal = ({ auth, closeModal, mutateResources, cohort }) => {
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
        dispatch(
          showNotification(
            "Dissertation Cohort has been updated successfully!",
          ),
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
        <p className="modal-card-title">Edit Dissertation Cohort</p>
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
                        name="academic_year"
                        validate={required}
                        component={AcademicYearSearch}
                      />
                    </div>
                    <label htmlFor="startDate"> Start date</label>
                    <div className="control">
                      <Field
                        showIcon
                        type="text"
                        id="start_date"
                        name="start_date"
                        className="input"
                        validate={required}
                        component={CalendarInput}
                      />
                      {/* <ImageComponent src={CalendarSVG} alt="calendar icon" /> */}
                    </div>
                    <label htmlFor="deadline_date"> Deadline date</label>
                    <div className="control">
                      <Field
                        showIcon
                        type="text"
                        className="input"
                        id="deadline_date"
                        validate={required}
                        name="deadline_date"
                        component={CalendarInput}
                      />
                    </div>
                    <label htmlFor="end_date"> End date</label>
                    <div className="control">
                      <Field
                        showIcon
                        type="text"
                        id="end_date"
                        name="end_date"
                        className="input"
                        validate={required}
                        component={CalendarInput}
                      />
                      {/* <ImageComponent src={CalendarSVG} alt="calendar icon" /> */}
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

CohortModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  mutateResources: PropTypes.func.isRequired,
  auth: PropTypes.instanceOf(Object).isRequired,
  cohort: PropTypes.instanceOf(Object).isRequired,
};

export default CohortModal;
