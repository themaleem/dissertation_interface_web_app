import Link from "next/link";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { Form, Field } from "react-final-form";

import { getPath } from "../../../../config/urls";
import { required } from "../../../../lib/objects";
import ImageComponent from "../../../../components/image";
import { FORM_SUBSCRIPTION } from "../../../../config/form";
import DepartmentSearch from "../departments/departmentSearch";
import TextInput from "../../../../components/inputs/textInput";
import BackArrowImage from "../../../../public/images/back-arrow.svg";
import createCourse from "../../../../actions/systemConfig/course/createCourse";
import { showNotification } from "../../../../reducers/notification/notificationReducer";

const coursesPath = getPath("coursesPath").href;

const CreateCourse = ({ auth }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const navToCourseListPage = () => router.push(coursesPath);

  const onSubmit = (values) => {
    const data = {
      name: values.name,
      departmentId: values.department.value,
    };

    return dispatch(createCourse(data))
      .then(() => {
        dispatch(showNotification("Course has been created successfully!"));
        navToCourseListPage();
      })
      .catch((err) => {
        // @note dispatching only the very first error i encounter on create
        // instead of multiple
        // const errorList = err.data.errors.Custom;
        // dispatch(showNotification(errorList[0]));
      });
  };

  return (
    <section className="form-wrapper dashboard-add-admin">
      <div className="form-card-wrapper">
        <div>
          <div className="form-card">
            <div className="form-card-header no-bt">
              <Link
                href={coursesPath}
                className="form-card-nav-link is-flex is-align-items-center"
              >
                <ImageComponent src={BackArrowImage} />
                Back to course list
              </Link>

              <div className="form-card-nav-link-inner">
                <h3>Add new Course</h3>
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
                          id="name"
                          name="name"
                          type="text"
                          className="input"
                          validate={required}
                          component={TextInput}
                        />
                        <label htmlFor="lastName"> Course Name </label>
                      </div>
                    </div>
                    <div className="field">
                      <div className="control">
                        <Field
                          type="text"
                          auth={auth}
                          searchable
                          clearable
                          id="department"
                          className="input"
                          name="department"
                          validate={required}
                          component={DepartmentSearch}
                          placeholder="Select a department"
                        />
                      </div>
                    </div>
                    <div className="is-flex is-align-items-center is-justify-content-flex-end form-card-footer">
                      <button
                        type="button"
                        className="button no-bg"
                        onClick={navToCourseListPage}
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
                        Add Course
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

CreateCourse.propTypes = { auth: PropTypes.instanceOf(Object).isRequired };

export default CreateCourse;