import Link from "next/link";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { Form, Field } from "react-final-form";

import { getPath } from "../../../../../config/urls";
import { required } from "../../../../../lib/objects";
import ImageComponent from "../../../../../components/image";
import { FORM_SUBSCRIPTION } from "../../../../../config/form";
import AcademicYearSearch from "../academicYear/academicYearSearch";
import CalendarSVG from "../../../../../public/images/calendar.svg";
import BackArrowImage from "../../../../../public/images/back-arrow.svg";
import CalendarInput from "../../../../../components/inputs/calendarInput";
import createCohort from "../../../../../actions/systemConfig/cohort/createCohort";
import { showNotification } from "../../../../../reducers/notification/notificationReducer";

const dissertationCohortsPath = `${
  getPath("systemConfigurationPath").href
}#tab=cohorts`;

const CreateCohort = ({ auth }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const navToCohortListPage = () => router.push(dissertationCohortsPath);

  const onSubmit = (values) => {
    const data = {
      endDate: values.end_date,
      startDate: values.start_date,
      academicYearId: values.academic_year.value,
      supervisionChoiceDeadline: values.deadline_date,
    };

    return dispatch(createCohort(data))
      .then(() => {
        dispatch(
          showNotification(
            "Dissertation Cohort has been created successfully!",
          ),
        );
        navToCohortListPage();
      })
      .catch((err) => {
        // @note dispatching only the very first error i encounter on create
        // instead of multiple
        const errorList = Object.values(err.data?.errors);
        dispatch(
          showNotification(errorList?.[0]?.[0] || "Something went wrong."),
        );
      });
  };

  return (
    <section className="form-wrapper dashboard-add-admin">
      <div className="form-card-wrapper">
        <div>
          <div className="form-card">
            <div className="form-card-header no-bt">
              <Link
                href={dissertationCohortsPath}
                className="form-card-nav-link is-flex is-align-items-center"
              >
                <ImageComponent src={BackArrowImage} alt="back arrow" />
                Back to Dissertation Cohort List
              </Link>

              <div className="form-card-nav-link-inner">
                <h3>New Dissertation Cohort</h3>
              </div>
            </div>
            <Form
              onSubmit={onSubmit}
              subscription={FORM_SUBSCRIPTION}
              render={({ submitting, handleSubmit, hasValidationErrors }) => {
                return (
                  <form className="form-container" autoComplete="off">
                    <div className="field">
                      <label htmlFor="startDate"> Academic Year</label>
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
                          className="input"
                          name="start_date"
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

                    <div className="is-flex is-align-items-center is-justify-content-flex-end form-card-footer">
                      <button
                        type="button"
                        className="button no-bg"
                        onClick={navToCohortListPage}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={handleSubmit}
                        className={`button${
                          submitting ? " is-loading-custom" : ""
                        }`}
                        disabled={hasValidationErrors || submitting}
                      >
                        Add dissertation cohort
                      </button>
                    </div>
                  </form>
                );
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

CreateCohort.propTypes = {
  auth: PropTypes.instanceOf(Object).isRequired,
};

export default CreateCohort;
