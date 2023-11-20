import Link from "next/link";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { Form, Field } from "react-final-form";

import { getPath } from "../../../../config/urls";
import { required } from "../../../../lib/objects";
import ImageComponent from "../../../../components/image";
import { FORM_SUBSCRIPTION } from "../../../../config/form";
import BackArrowImage from "../../../../public/images/back-arrow.svg";
import CalendarInput from "../../../../components/inputs/calendarInput";
import AcademicYearSearch from "../systemConfiguration/academicYearSearch";
import createCohort from "../../../../actions/systemConfig/cohort/createCohort";
import { showNotification } from "../../../../reducers/notification/notificationReducer";

const dissertationCohortsPath = getPath("dissertationCohortsPath").href;

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
                <ImageComponent src={BackArrowImage} />
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
                      <label htmlFor="startDate"> Start date</label>
                      <div className="control">
                        <Field
                          showIcon
                          type="text"
                          id="start_date"
                          className="input"
                          name="start_date"
                          validate={required}
                          component={CalendarInput}
                        />
                        {/* <ImageComponent src={CalendarSVG} alt="calendar icon" /> */}
                      </div>
                      <label htmlFor="startDate"> Deadline date</label>
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
                      <label htmlFor="startDate"> End date</label>
                      <div className="control">
                        <Field
                          showIcon
                          type="text"
                          name="end_date"
                          id="start_date"
                          className="input"
                          validate={required}
                          component={CalendarInput}
                        />
                        {/* <ImageComponent src={CalendarSVG} alt="calendar icon" /> */}
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
