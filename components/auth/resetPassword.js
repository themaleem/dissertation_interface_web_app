import Link from "next/link";
import { Form } from "react-final-form";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

import ImageComponent from "../image";
import { getPath } from "../../config/urls";
import Logo from "../../public/images/logo.svg";
import PasswordInput from "../inputs/passwordInput";
import { FORM_SUBSCRIPTION } from "../../config/form";
import resetPassword from "../../actions/auth/resetPassword";
import { validateConfirmationPassword } from "../../lib/objects";
import BackArrowImage from "../../public/images/back-arrow.svg";
import { showNotification } from "../../reducers/notification/notificationReducer";

const homePath = getPath("homePath").href;
const signInPath = getPath("signInPath").href;

const ResetPassword = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const username = router.query.username?.trim();
  const token = router.query.activationToken?.trim().replace(/ /g, "+");

  const onSubmit = (values) => {
    const data = { userName: username, token, password: values.password };

    return dispatch(resetPassword(data))
      .then((res) => {
        if (!res) return undefined;

        dispatch(
          showNotification(
            "Your new password has been set successfully. You can now sign in",
          ),
        );
        return router.push(signInPath);
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
                href={homePath}
                className="form-card-nav-link is-flex is-align-items-center"
              >
                <ImageComponent alt="back-arrow" src={BackArrowImage} />
                Back to home
              </Link>

              <div className="form-card-nav-link-inner">
                <h3>Reset password</h3>
                <ImageComponent
                  src={Logo}
                  alt="logo"
                  className="form-card-logo"
                />
              </div>
            </div>
            <Form
              onSubmit={onSubmit}
              subscription={FORM_SUBSCRIPTION}
              validate={validateConfirmationPassword}
              render={({ handleSubmit, hasValidationErrors, submitting }) => {
                return (
                  <form className="form-container" autoComplete="off">
                    <p className="form-container-sub-text">
                      Enter your new password in the field below.
                    </p>
                    <div className="field">
                      <div className="control">
                        <PasswordInput
                          id="password"
                          name="password"
                          type="password"
                          validatePasswordField
                          labelText="New password"
                        />
                      </div>
                      <div className="control">
                        <PasswordInput
                          type="password"
                          validatePasswordField
                          id="password_confirmation"
                          labelText="Confirm password"
                          name="password_confirmation"
                        />
                      </div>
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
                        Reset Password
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

ResetPassword.propTypes = {};

export default ResetPassword;
