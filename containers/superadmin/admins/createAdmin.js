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
import createAdminUser from "../../../actions/superadmin/createAdminUser";
import { showNotification } from "../../../reducers/notification/notificationReducer";

import BackArrowImage from "../../../public/images/back-arrow.svg";
import RadioInput from "../../../components/inputs/radioInput";

const adminUsersPath = getPath("adminUsersPath").href;

const rolesOption = [
  { label: "Admin", value: "admin" },
  { label: "Super Admin", value: "superadmin" },
];

const CreateAdminUser = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const navToAdminListPage = () => router.push(adminUsersPath);

  const onSubmit = (values) => {
    const data = {
      role: values.role,
      email: values.email,
      userName: values.username,
      lastName: values.last_name,
      firstName: values.first_name,
    };

    return dispatch(createAdminUser(data))
      .then(() => {
        dispatch(
          showNotification("Admin account has been created successfully!"),
        );
        navToAdminListPage();
      })
      .catch((err) => {
        // @note dispatching only the very first error i encounter on create
        // instead of multiple
        const errorList = err.data.errors.Custom;
        dispatch(showNotification(errorList[0]));
      });
  };

  return (
    <section className="form-wrapper dashboard-add-admin">
      <div className="form-card-wrapper">
        <div>
          <div className="form-card">
            <div className="form-card-header no-bt">
              <Link
                href={adminUsersPath}
                className="form-card-nav-link is-flex is-align-items-center"
              >
                <ImageComponent src={BackArrowImage} alt="back arrow" />
                Back to manage admin
              </Link>

              <div className="form-card-nav-link-inner">
                <h3>Add new admin</h3>
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
                        <div className="control">
                          <Field
                            type="text"
                            id="firstName"
                            className="input"
                            name="first_name"
                            validate={required}
                            component={TextInput}
                          />
                          <label htmlFor="firstName"> First name</label>
                        </div>
                      </div>
                      <div className="field">
                        <div className="control">
                          <Field
                            type="text"
                            id="lastName"
                            name="last_name"
                            className="input"
                            validate={required}
                            component={TextInput}
                          />
                          <label htmlFor="lastName"> Last name </label>
                        </div>
                      </div>
                    </div>
                    <div className="field">
                      <div className="control">
                        <EmailInput
                          id="email"
                          isShuEmail
                          validateField
                          className="input"
                          change={form.change}
                        />
                        <label htmlFor> Enter email address </label>
                      </div>
                    </div>
                    <div className="field">
                      <div className="control">
                        <Field
                          type="text"
                          id="username"
                          name="username"
                          className="input"
                          validate={required}
                          component={TextInput}
                        />
                        <label htmlFor="username"> Staff ID </label>
                      </div>
                    </div>
                    <div className="field">
                      <div className="radio-control">
                        <span className="span-label">
                          Select a role for the admin
                        </span>
                        <div className="radio-group">
                          {rolesOption.map((option) => (
                            <Field
                              name="role"
                              type="radio"
                              id={option.value}
                              key={option.value}
                              validate={required}
                              value={option.value}
                              label={option.label}
                              component={RadioInput}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="is-flex is-align-items-center is-justify-content-flex-end form-card-footer">
                      <button
                        type="button"
                        className="button no-bg"
                        onClick={navToAdminListPage}
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
                        Add admin
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

CreateAdminUser.propTypes = {};

export default CreateAdminUser;
