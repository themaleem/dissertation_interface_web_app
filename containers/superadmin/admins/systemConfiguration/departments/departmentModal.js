import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { Form, Field } from "react-final-form";

import { required } from "../../../../../lib/objects";
import ImageComponent from "../../../../../components/image";
import TextInput from "../../../../../components/inputs/textInput";
import CloseSVGImage from "../../../../../public/images/close.svg";
import { FORM_WITH_DIRTY_VALUES } from "../../../../../config/form";
import { showNotification } from "../../../../../reducers/notification/notificationReducer";
import createDepartment from "../../../../../actions/systemConfig/departments/createDepartment";
import updateDepartment from "../../../../../actions/systemConfig/departments/updateDepartment";

const DepartmentModal = ({
  closeModal,
  actionType,
  department,
  mutateResources,
}) => {
  const dispatch = useDispatch();
  const isEdit = actionType === "edit";
  const initialValues = { name: department.name };

  const onSubmit = (values) => {
    const data = { name: values.name };
    if (isEdit) data.id = department.id;

    const action = isEdit ? updateDepartment : createDepartment;
    return dispatch(action(data))
      .then(() => {
        dispatch(showNotification("Department has been updated successfully!"));
        mutateResources();
        closeModal();
      })
      .catch((err) => {
        dispatch(showNotification(err.message));
      })
      .finally();
  };

  return (
    <div className="modal-card">
      <header className="modal-card-head">
        <p className="modal-card-title">
          {isEdit ? "Edit" : "Create"} Department
        </p>
        <button
          type="button"
          aria-label="close"
          className="close-btn"
          onClick={() => closeModal()}
        >
          <ImageComponent src={CloseSVGImage} />
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
                    <div className="control">
                      <Field
                        id="name"
                        name="name"
                        type="text"
                        className="input"
                        validate={required}
                        component={TextInput}
                      />
                      <label htmlFor="name"> Name </label>
                    </div>
                  </div>
                </div>
              </section>
              <footer className="modal-card-foot">
                <button
                  type="button"
                  className="button"
                  onClick={() => closeModal()}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className={`button is-primary${
                    submitting ? " is-loading-custom" : ""
                  }`}
                  disabled={submitting || !dirty || hasValidationErrors}
                >
                  {isEdit ? "Edit" : "Create"} Department
                </button>
              </footer>
            </>
          );
        }}
      />
    </div>
  );
};

DepartmentModal.defaultProps = { department: {} };

DepartmentModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  actionType: PropTypes.string.isRequired,
  department: PropTypes.instanceOf(Object),
  mutateResources: PropTypes.func.isRequired,
};

export default DepartmentModal;
