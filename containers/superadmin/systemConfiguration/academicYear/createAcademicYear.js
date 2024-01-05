import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { Form, Field } from "react-final-form";

import { getPath } from "../../../../config/urls";
import { required } from "../../../../lib/objects";
import ImageComponent from "../../../../components/image";
import { FORM_SUBSCRIPTION } from "../../../../config/form";
import CalendarSVG from "../../../../public/images/calendar.svg";
import BackArrowImage from "../../../../public/images/back-arrow.svg";
import { showNotification } from "../../../../components/notification";
import CalendarInput from "../../../../components/inputs/calendarInput";
import createAcademicYear from "../../../../actions/systemConfig/createAcademicYear";

const systemConfigurationPath = `${
  getPath("systemConfigurationPath").href
}#tab=academic-year`;

const CreateAcademicYear = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const navToAcademicYearsPage = () => router.push(systemConfigurationPath);

  const onSubmit = (values) => {
    const data = {
      endDate: values.end_date,
      startDate: values.start_date,
    };

    return dispatch(createAcademicYear(data))
      .then(() => {
        showNotification({
          severity: "success",
          detail: "Academic year has been created successfully!",
        });
        navToAcademicYearsPage();
      })
      .catch((err) => {
        // @note dispatching only the very first error i encounter on create
        // instead of multiple
        const errorList = Object.values(err.data?.errors);
        showNotification({
          detail: errorList?.[0]?.[0] || "Something went wrong.",
        });
      });
  };

  return (
    <section className="form-wrapper dashboard-add-admin">
      <div className="form-card-wrapper">
        <div>
          <div className="form-card">
            <div className="form-card-header no-bt">
              <Link
                href={systemConfigurationPath}
                className="form-card-nav-link is-flex is-align-items-center"
              >
                <ImageComponent src={BackArrowImage} alt="back arrow" />
                Back to academic year list
              </Link>

              <div className="form-card-nav-link-inner">
                <h3>Add new academic year</h3>
              </div>
            </div>
            <Form
              onSubmit={onSubmit}
              subscription={FORM_SUBSCRIPTION}
              render={({ submitting, handleSubmit, hasValidationErrors }) => {
                return (
                  <form className="form-container" autoComplete="off">
                    <div className="field">
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
                        <label htmlFor="startDate" className="is-active">
                          Start date
                        </label>
                        <ImageComponent
                          src={CalendarSVG}
                          alt="calendar icon"
                          className="calendar-icon"
                        />
                      </div>
                    </div>
                    <div className="field">
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
                        onClick={navToAcademicYearsPage}
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
                        Add Academic Year
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

CreateAcademicYear.propTypes = {};

export default CreateAcademicYear;
