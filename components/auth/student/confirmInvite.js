import Link from "next/link";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { Field, Form } from "react-final-form";
import { useEffect, useMemo, useState } from "react";

import ImageComponent from "../../image";
import { getPath } from "../../../config/urls";
import TextInput from "../../inputs/textInput";
import Logo from "../../../public/images/logo.svg";
import { showNotification } from "../../notification";
import PasswordInput from "../../inputs/passwordInput";
import { FORM_SUBSCRIPTION } from "../../../config/form";
import BackArrowImage from "../../../public/images/back-arrow.svg";
import confirmInvite from "../../../actions/students/confirmInvite";
import FrontArrowImage from "../../../public/images/front-arrow.svg";
import registerStudent from "../../../actions/students/registerStudent";
import { required, validateConfirmationPassword } from "../../../lib/objects";
import CourseSearch from "../../../containers/superadmin/admins/systemConfiguration/courses/courseSearch";

const homePath = getPath("homePath").href;
const signInPath = getPath("signInPath").href;

const ConfirmStudentInvite = ({ auth }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const studentId = router.query.username?.trim();
  const code = router.query.code?.trim().replace(/ /g, "+");

  const [showError, setShowError] = useState(false);
  const [invitation, setInivitation] = useState({});
  const [formType, setFormType] = useState("confirm");
  const [invitationFetched, setiInvitationFetched] = useState(false);

  const initialValues = useMemo(() => {
    return {
      last_name: invitation.lastName,
      student_id: invitation.studentId,
      first_name: invitation.firstName,
    };
  }, [invitation]);

  useEffect(() => {
    if (!code || !studentId) return undefined;

    if (!invitationFetched) {
      dispatch(confirmInvite({ invitationCode: code, studentId }))
        .then((res) => {
          if (!res) {
            setShowError(true);
            return undefined;
          }
          setInivitation(res.result);
          setFormType("accept");

          return showNotification({
            severity: "success",
            detail: "Your invite has been confirmed successfully",
          });
        })
        .catch((err) => {
          setShowError(true);
          showNotification({ detail: err.message });
        })
        .finally(setiInvitationFetched(true));
    }
  }, [code, dispatch, invitationFetched, router, studentId]);

  const onSubmit = (values) => {
    const data = {
      invitationCode: code,
      password: values.password,
      lastName: values.last_name,
      firstName: values.first_name,
      studentId: values.student_id,
      courseId: values.course.value,
    };

    return dispatch(registerStudent(data))
      .then((res) => {
        if (!res) return undefined;

        showNotification({
          severity: "success",
          detail: "Invitation accepted. You can now sign in",
        });
        return router.push(signInPath);
      })
      .catch(() => {
        showNotification();
      });
  };

  return (
    <section className="form-wrapper">
      <div className="form-card-wrapper">
        <div>
          <div className="form-card">
            <div className="form-card-header">
              <Link
                passHref
                href={homePath}
                className="form-card-nav-link is-flex is-align-items-center"
              >
                <ImageComponent alt="back-arrow" src={BackArrowImage} />
                Back to homepage
              </Link>

              <div className="form-card-nav-link-inner">
                <h3>
                  {formType === "confirm"
                    ? "Confirm Invite"
                    : "Register Account"}
                </h3>
                <ImageComponent
                  src={Logo}
                  alt="logo"
                  className="form-card-logo"
                />
              </div>
            </div>

            {formType === "confirm" ? (
              <form className="form-container" autoComplete="off">
                {showError ? (
                  <p className="form-container-sub-text">
                    Something went wrong while trying to confirm your
                    invitation. This might be due to invalid/expired invitation
                    link or an already confirmed invite.
                  </p>
                ) : (
                  <p className="form-container-sub-text">
                    Please hold on while we try to confirm your invite.
                  </p>
                )}
                <div className="is-flex is-align-items-center is-justify-content-space-between form-card-footer">
                  <span />
                </div>
              </form>
            ) : (
              <Form
                onSubmit={onSubmit}
                initialValues={initialValues}
                subscription={FORM_SUBSCRIPTION}
                validate={validateConfirmationPassword}
                render={({ submitting, handleSubmit, hasValidationErrors }) => {
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
                      <div className="field-group">
                        <div className="field">
                          <Field
                            type="text"
                            id="studentId"
                            name="student_id"
                            className="input"
                            validate={required}
                            labelText="Student ID"
                            component={TextInput}
                          />
                        </div>
                        <div className="field">
                          <div className="control">
                            <Field
                              searchable
                              auth={auth}
                              id="course"
                              name="course"
                              className="input"
                              validate={required}
                              component={CourseSearch}
                              placeholder="Select a course"
                            />
                            <label htmlFor="course"> Course </label>
                          </div>
                        </div>
                      </div>
                      <div className="field">
                        <PasswordInput
                          id="password"
                          name="password"
                          type="password"
                          validatePasswordField
                          labelText="New password"
                        />
                      </div>
                      <div className="field">
                        <PasswordInput
                          type="password"
                          validatePasswordField
                          id="password_confirmation"
                          labelText="Confirm password"
                          name="password_confirmation"
                        />
                      </div>
                      <div className="is-flex is-align-items-center is-justify-content-space-between form-card-footer">
                        <span />
                        <button
                          type="button"
                          onClick={handleSubmit}
                          className={`button${
                            submitting ? " is-loading-custom" : ""
                          }`}
                          disabled={submitting || hasValidationErrors}
                        >
                          Register
                        </button>
                      </div>
                    </form>
                  );
                }}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

ConfirmStudentInvite.propTypes = {
  auth: PropTypes.instanceOf(Object).isRequired,
};

export default ConfirmStudentInvite;
