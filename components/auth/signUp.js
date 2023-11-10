import Link from "next/link";
import { Field, Form } from "react-final-form";

import { getPath } from "../../config/urls";
import { FORM_SUBSCRIPTION } from "../../config/form";

const signInPath = getPath("signInPath").href;

const SignUp = () => {
  const onSubmit = () => {};

  return (
    <div className="col-lg-6">
      <Form
        onSubmit={onSubmit}
        subscription={FORM_SUBSCRIPTION}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div className="card2 card border-0 px-4 py-5">
              <div className="row mb-4 px-3">
                <h5 className="mb-0 mr-4 mt-2 text-color">
                  Dissertation Interface - Register
                </h5>
              </div>
              <div className="row px-3">
                <label className="mb-1">
                  <h6 className="mb-0 text-body">Email Address</h6>
                </label>
                <Field name="email">
                  {(props) => (
                    <input
                      {...props.input}
                      className="mb-4"
                      type="text"
                      placeholder="Enter a valid email address"
                    />
                  )}
                </Field>
              </div>
              <div className="row px-3">
                <label className="mb-1">
                  <h6 className="mb-0 text-body">Registration Code</h6>
                </label>
                <Field name="reg_code">
                  {(props) => (
                    <input
                      {...props.input}
                      className="mb-4"
                      type="text"
                      placeholder="Enter password"
                    />
                  )}
                </Field>
              </div>
              <div className="row px-3">
                <label className="mb-1">
                  <h6 className="mb-0 text-body">Role</h6>
                </label>
                <Field name="role" component="select">
                  <option />
                  <option value="student">Student</option>
                  <option value="supervisor">Supervisor</option>
                </Field>
              </div>
              <div className="row px-3 mb-4" />
              <div className="row px-3">
                <label className="mb-1">
                  <h6 className="mb-0 text-body">Password</h6>
                </label>
                <Field name="password">
                  {(props) => (
                    <input
                      {...props.input}
                      type="password"
                      placeholder="Enter password"
                    />
                  )}
                </Field>
              </div>
              <div className="row px-3 mb-4" />
              <div className="row px-3">
                <label className="mb-1">
                  <h6 className="mb-0 text-body">Confirm Password</h6>
                </label>
                <Field name="password_cofirm">
                  {(props) => (
                    <input
                      {...props.input}
                      type="password"
                      placeholder="Enter password"
                    />
                  )}
                </Field>
              </div>
              <div className="row px-3 mb-4" />
              <div className="row mb-3 px-3">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="btn btn-blue text-center"
                >
                  Register
                </button>
              </div>
              <div className="row mb-4 px-3">
                <small className="font-weight-bold text-body">
                  Have an account already?
                  <Link href={signInPath} className="ml-auto mb-0 text-color">
                    Sign in
                  </Link>
                </small>
              </div>
            </div>
          </form>
        )}
      />
    </div>
  );
};

SignUp.propTypes = {};

export default SignUp;
