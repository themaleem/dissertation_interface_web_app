import Link from "next/link";
import { useRouter } from "next/router";
import { Form } from "react-final-form";
import { useDispatch } from "react-redux";

import ImageComponent from "../image";
import { getPath } from "../../config/urls";
import EmailInput from "../inputs/emailInput";
import signIn from "../../actions/auth/signIn";
import Logo from "../../public/images/logo.svg";
import PasswordInput from "../inputs/passwordInput";
import { FORM_SUBSCRIPTION } from "../../config/form";
import BackArrowImage from "../../public/images/back-arrow.svg";
import FrontArrowImage from "../../public/images/front-arrow.svg";
import { showNotification } from "../../reducers/notification/notificationReducer";

const homePath = getPath("homePath").href;
const forgotPasswordPath = getPath("forgotPasswordPath").href;
const superadminDashboardPath = getPath("superadminDashboardPath").href;

const SignIn = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const onSubmit = (values) => {
    const data = { email: values.email, password: values.password };

    return dispatch(signIn(data))
      .then(() => {
        router.push(superadminDashboardPath);
      })
      .catch((err) => {
        if (err?.data?.message) {
          return dispatch(showNotification(err.data.message));
        }
        return dispatch(
          showNotification(
            "Something went wrong. Please try again or contact an admin ",
          ),
        );
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
                <h3>Sign in</h3>
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
              render={({
                form,
                submitting,
                handleSubmit,
                hasValidationErrors,
              }) => {
                return (
                  <form className="form-container" autoComplete="off">
                    <div className="field">
                      <div className="control">
                        <EmailInput
                          id="email"
                          isShuEmail
                          name="email"
                          validateField
                          className="input"
                          change={form.change}
                        />
                        <label htmlFor="email"> Enter valid SHU email </label>
                      </div>
                      <div className="control">
                        <PasswordInput
                          name="password"
                          type="password"
                          validatePasswordField
                        />
                      </div>
                    </div>

                    <div className="is-flex is-justify-content-flex-end form-card-fp-link">
                      <Link href={forgotPasswordPath}>Forgot Password?</Link>
                    </div>
                    <div className="is-flex is-align-items-center is-justify-content-space-between form-card-footer">
                      <label className="check-container" htmlFor="remember-me">
                        {/* <input
                            type="checkbox"
                            id="remember-me"
                            name="remember-me"
                          />
                          <span className="checkmark">Remember me</span> */}
                      </label>

                      <button
                        id="submit"
                        type="button"
                        onClick={handleSubmit}
                        className={`button${
                          submitting ? " is-loading-custom" : ""
                        }`}
                        disabled={submitting || hasValidationErrors}
                      >
                        Sign in
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

SignIn.propTypes = {};

export default SignIn;