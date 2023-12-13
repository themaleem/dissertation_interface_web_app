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
import { showNotification } from "../../../components/notification";
import createSupervisorInvite from "../../../actions/supervisors/createSupervisorInvite";

const supervisorsPath = `${getPath("supervisorsPath").href}#tab=invites`;

const CreateSupervisorInvite = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const navToSupervisorListPage = () => router.push(supervisorsPath);

  const onSubmit = (values) => {
    const data = {
      email: values.email,
      staffId: values.staff_id,
      lastName: values.last_name,
      firstName: values.first_name,
    };

    return dispatch(createSupervisorInvite(data))
      .then(() => {
        showNotification({
          severity: "success",
          detail: "Invite has been sent successfully!",
        });
        navToSupervisorListPage();
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
                href={supervisorsPath}
                className="form-card-nav-link is-flex is-align-items-center"
              >
                <ImageComponent src={BackArrowImage} alt="back arrow" />
                Back to supervisor list
              </Link>

              <div className="form-card-nav-link-inner">
                <h3>Invite new supervisor</h3>
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
                          component={TextInput}
                          labelText="Last Name"
                        />
                      </div>
                    </div>
                    <div className="field">
                      <EmailInput
                        id="email"
                        isShuEmail
                        validateField
                        className="input"
                        change={form.change}
                        labelText="Enter email address"
                      />
                    </div>
                    <div className="field">
                      <Field
                        type="text"
                        id="staff_id"
                        name="staff_id"
                        className="input"
                        validate={required}
                        component={TextInput}
                        labelText="Staff ID"
                      />
                    </div>
                    <div className="is-flex is-align-items-center is-justify-content-flex-end form-card-footer">
                      <button
                        type="button"
                        className="button no-bg"
                        onClick={navToSupervisorListPage}
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

CreateSupervisorInvite.propTypes = {};

export default CreateSupervisorInvite;
