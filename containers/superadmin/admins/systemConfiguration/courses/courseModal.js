import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { Form, Field } from "react-final-form";

import { required } from "../../../../../lib/objects";
import ImageComponent from "../../../../../components/image";
import DepartmentSearch from "../departments/departmentSearch";
import TextInput from "../../../../../components/inputs/textInput";
import CloseSVGImage from "../../../../../public/images/close.svg";
import { FORM_WITH_DIRTY_VALUES } from "../../../../../config/form";
import { showNotification } from "../../../../../components/notification";
import updateCourse from "../../../../../actions/systemConfig/course/updateCourse";

// import AcademicYearSearchB from "../../../../../components/inputs/selectInputB";

const CourseModal = ({ auth, closeModal, mutateResources, course }) => {
  const dispatch = useDispatch();

  const { department } = course;

  const initialValues = {
    name: course.name,
    department: { label: department.name, value: department.id },
  };

  const onSubmit = (values) => {
    const data = {
      id: course.id,
      name: values.name,
      departmentId: values.department.value,
    };

    return dispatch(updateCourse(data))
      .then(() => {
        showNotification({
          severity: "success",
          detail: "Course has been updated successfully!",
        });
        mutateResources();
      })
      .catch((err) => {
        showNotification({ detail: err.message });
      })
      .finally(closeModal);
  };

  return (
    <div className="modal-card">
      <header className="modal-card-head">
        <p className="modal-card-title">Edit Course</p>
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
                    <Field
                      id="name"
                      name="name"
                      type="text"
                      labelText="Name"
                      className="input"
                      validate={required}
                      component={TextInput}
                    />
                  </div>
                  <div className="field">
                    <div className="control">
                      <Field
                        auth={auth}
                        type="text"
                        id="department"
                        className="input"
                        name="department"
                        validate={required}
                        component={DepartmentSearch}
                      />
                      <label htmlFor="department"> Department </label>
                    </div>
                  </div>
                  {/* <div className="field">
                    <div className="control">
                      <Field
                        auth={auth}
                        searchable
                        type="text"
                        id="department"
                        className="input"
                        name="departments"
                        validate={required}
                        component={AcademicYearSearchB}
                      />
                      <label htmlFor="department"> Department </label>
                    </div>
                  </div> */}
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

CourseModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  mutateResources: PropTypes.func.isRequired,
  auth: PropTypes.instanceOf(Object).isRequired,
  course: PropTypes.instanceOf(Object).isRequired,
};

export default CourseModal;
