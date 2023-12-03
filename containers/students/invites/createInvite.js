import Link from "next/link";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { Form, Field } from "react-final-form";

import { getPath } from "../../../config/urls";
import { required } from "../../../lib/objects";
import ImageComponent from "../../../components/image";
import { FORM_SUBSCRIPTION } from "../../../config/form";
import TextInput from "../../../components/inputs/textInput";
import EmailInput from "../../../components/inputs/emailInput";
import BackArrowImage from "../../../public/images/back-arrow.svg";
import createStudentInvite from "../../../actions/students/createStudentInvite";
import { showNotification } from "../../../reducers/notification/notificationReducer";

const studentsPath = `${getPath("studentsPath").href}#tab=invites`;

const CreateStudentInvite = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const navToStudentsListPage = () => router.push(studentsPath);

  const onSubmit = (values) => {
    const data = {
      email: values.email,
      studentId: values.student_id,
      lastName: values.last_name,
      firstName: values.first_name,
    };

    return dispatch(createStudentInvite(data))
      .then(() => {
        dispatch(showNotification("Invite has been sent successfully!"));
        navToStudentsListPage();
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
                href={studentsPath}
                className="form-card-nav-link is-flex is-align-items-center"
              >
                <ImageComponent src={BackArrowImage} alt="back arrow" />
                Back to students list
              </Link>

              <div className="form-card-nav-link-inner">
                <h3>Invite new student</h3>
              </div>
            </div>
            <Form
              onSubmit={onSubmit}
              subscription={FORM_SUBSCRIPTION}
              render={({
                form,
                submitting,
                handleSubmit,
                hasValidationErrors,
              }) => {
                return (
                  <form className="form-container" autoComplete="off">
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
                          labelText="Last Name"
                          component={TextInput}
                        />
                      </div>
                    </div>
                    <div className="field">
                      <EmailInput
                        id="email"
                        isShuEmail
                        validateField
                        className="input"
                        labelText="Enter email address"
                        change={form.change}
                      />
                    </div>
                    <div className="field">
                      <Field
                        type="text"
                        id="studentId"
                        name="student_id"
                        className="input"
                        validate={required}
                        component={TextInput}
                        labelText="Student ID"
                      />
                    </div>
                    <div className="is-flex is-align-items-center is-justify-content-flex-end form-card-footer">
                      <button
                        type="button"
                        className="button no-bg"
                        onClick={navToStudentsListPage}
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
                        Send Invite
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

CreateStudentInvite.propTypes = {};

export default CreateStudentInvite;
