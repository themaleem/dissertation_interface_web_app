import { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

import { showNotification } from "../../notification";
import forgotPassword from "../../../actions/auth/forgotPassword";

const ForgotPasswordSuccess = ({ values }) => {
  const dispatch = useDispatch();
  const [submitting, setSubmitting] = useState();

  const onResend = () => {
    setSubmitting(true);
    const data = { email: values.email };

    return dispatch(forgotPassword(data))
      .then((res) => {
        if (!res) return undefined;

        return showNotification({
          severity: "success",
          detail: "Email has been resent!",
        });
      })
      .catch(() => {
        showNotification();
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <>
      <p className="form-container-sub-text">
        A <strong>reset code</strong> has been sent to your email address{" "}
        <strong>{values.email}</strong>.{/* Please enter the code below. */}
      </p>

      <div className="is-flex is-align-items-center is-justify-content-space-between form-card-footer">
        <button
          type="button"
          id="resend_email"
          onClick={onResend}
          className={`button${submitting ? " is-loading-custom" : ""}`}
        >
          Resend code
        </button>
      </div>
    </>
  );
};

ForgotPasswordSuccess.propTypes = {
  values: PropTypes.instanceOf(Object).isRequired,
};

export default ForgotPasswordSuccess;
