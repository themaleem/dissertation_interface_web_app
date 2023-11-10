import Link from "next/link";
import { useState } from "react";
import { Form } from "react-final-form";
import { useDispatch } from "react-redux";

import ImageComponent from "../../image";
import { getPath } from "../../../config/urls";
import EmailInput from "../../inputs/emailInput";
import Logo from "../../../public/images/logo.svg";
import { FORM_WITH_VALUES } from "../../../config/form";
import ForgotPasswordSuccess from "./forgotPasswordSuccess";
import forgotPassword from "../../../actions/auth/forgotPassword";
import BackArrowImage from "../../../public/images/back-arrow.svg";
import FrontArrowImage from "../../../public/images/front-arrow.svg";
import { showNotification } from "../../../reducers/notification/notificationReducer";

const signInPath = getPath("signInPath").href;

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const [successful, setSuccessful] = useState(false);

  const onForgotPassword = (values) => {
    const data = { email: values.email };

    return dispatch(forgotPassword(data))
      .then((res) => {
        if (!res) return undefined;

        dispatch(showNotification("Email sent!."));
        setSuccessful(true);
      })
      .catch(() => {
        dispatch(showNotification("Something went wrong"));
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
                href={signInPath}
                className="form-card-nav-link is-flex is-align-items-center"
              >
                <ImageComponent alt="back-arrow" src={BackArrowImage} />
                Back to sign in
              </Link>

              <div className="form-card-nav-link-inner">
                <h3>Forgot password?</h3>
                <ImageComponent
                  src={Logo}
                  alt="logo"
                  className="form-card-logo"
                />
              </div>
            </div>
            <Form
              onSubmit={onForgotPassword}
              subscription={FORM_WITH_VALUES}
              render={({
                form,
                values,
                submitting,
                handleSubmit,
                hasValidationErrors,
              }) => {
                return (
                  <form
                    autoComplete="off"
                    id="forgot-password-form"
                    className="form-container"
                  >
                    {successful ? (
                      <ForgotPasswordSuccess values={values} />
                    ) : (
                      <>
                        <p className="form-container-sub-text">
                          Please enter the email address attached to your
                          account and we will send you a{" "}
                          <strong>reset code</strong>.
                        </p>
                        <div className="field">
                          <div className="control">
                            <EmailInput
                              id="email"
                              validateField
                              className="input"
                              change={form.change}
                            />
                            <label htmlFor="email"> Email address </label>
                          </div>
                        </div>
                        <div className="is-flex is-align-items-center is-justify-content-space-between form-card-footer">
                          <span />
                          <button
                            id="submit"
                            type="button"
                            className={`button${
                              submitting ? " is-loading-custom" : ""
                            }`}
                            onClick={handleSubmit}
                            disabled={submitting || hasValidationErrors}
                          >
                            Send code
                          </button>
                        </div>
                      </>
                    )}
                  </form>
                );
              }}
            />
          </div>
          <div className="form-card-bt-strip no-bg">
            <p>Don’t have an account?</p>
            <Link href={signInPath} className="is-flex is-align-item-center">
              Get started here
              <ImageComponent alt="front-arrow" src={FrontArrowImage} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

ForgotPassword.propTypes = {};

export default ForgotPassword;
