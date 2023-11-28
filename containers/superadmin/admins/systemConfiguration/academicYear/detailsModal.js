import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { Form, Field } from "react-final-form";

import { required } from "../../../../../lib/objects";
import ImageComponent from "../../../../../components/image";
import { toDayMonthYearLong } from "../../../../../lib/dateUtils";
import CloseSVGImage from "../../../../../public/images/close.svg";
import { FORM_WITH_DIRTY_VALUES } from "../../../../../config/form";
import CalendarSVG from "../../../../../public/images/calendar.svg";
import EmailInput from "../../../../../components/inputs/emailInput";
import CalendarInput from "../../../../../components/inputs/calendarInput";
import updateAcademicYear from "../../../../../actions/systemConfig/updateAcademicYear";
import { showNotification } from "../../../../../reducers/notification/notificationReducer";

const DetailsModal = ({
  modalType,
  closeModal,
  academicYear,
  setModalType,
  mutateResources,
}) => {
  const dispatch = useDispatch();

  const initialValues = {
    start_date: academicYear.startDate,
    end_date: academicYear.endDate,
  };

  const onSubmit = (values) => {
    const data = {
      id: academicYear.id,
      endDate: values.end_date,
      startDate: values.start_date,
    };

    return dispatch(updateAcademicYear(data))
      .then(() => {
        dispatch(
          showNotification("Academic Year has been updated successfully!"),
        );
        mutateResources();
      })
      .catch((err) => {
        const errorList = Object.values(err.data?.errors);
        dispatch(
          showNotification(errorList?.[0]?.[0] || "Something went wrong."),
        );
      })
      .finally(closeModal);
  };

  return (
    <div className="modal-card">
      <header className="modal-card-head">
        <p className="modal-card-title">
          {modalType === "details" ? "Academic year" : "Edit Academic Year"}
        </p>
        <button
          type="button"
          aria-label="close"
          className="close-btn"
          onClick={closeModal}
        >
          <ImageComponent src={CloseSVGImage} alt="close-icon" />
        </button>
      </header>
      {modalType === "details" ? (
        <>
          <section className="modal-card-body">
            <div className="modal-form-content">
              <div className="text-content-block">
                <div className="is-flex text-declartn is-align-item-center">
                  <p className="text-key">Start date:</p>
                  <p className="text-val">
                    {toDayMonthYearLong(academicYear.startDate)}
                  </p>
                </div>
                <div className="is-flex text-declartn is-align-item-center">
                  <p className="text-key">End date:</p>
                  <p className="text-val">
                    {toDayMonthYearLong(academicYear.endDate)}
                  </p>
                </div>
                <div className="is-flex text-declartn is-align-item-center">
                  <p className="text-key">Status:</p>
                  <p className="text-val">{academicYear?.status}</p>
                </div>
                <div className="is-flex text-declartn is-align-item-center">
                  <p className="text-key">Date created:</p>
                  <p className="text-val">{academicYear.createdAt}</p>
                </div>
                <div className="is-flex text-declartn is-align-item-center">
                  <p className="text-key">Created by:</p>
                  <p className="text-val">{academicYear.createdBy}</p>
                </div>

                {academicYear?.updatedAt && (
                  <div className="is-flex text-declartn is-align-item-center">
                    <p className="text-key">Last modified:</p>
                    <p className="text-val">
                      {toDayMonthYearLong(academicYear.updatedAt)}
                    </p>
                  </div>
                )}
                {academicYear?.updatedBy && (
                  <div className="is-flex text-declartn is-align-item-center">
                    <p className="text-key">Last modified by:</p>
                    <p className="text-val">{academicYear.updatedBy}</p>
                  </div>
                )}
              </div>
            </div>
          </section>
          <footer className="modal-card-foot left">
            <button
              type="button"
              className="button text-blue is-white"
              onClick={() => setModalType("edit")}
            >
              Edit details
            </button>
            <button
              type="button"
              onClick={closeModal}
              className="button is-white text-red"
            >
              Close
            </button>
          </footer>
        </>
      ) : (
        <Form
          onSubmit={onSubmit}
          initialValues={initialValues}
          subscription={FORM_WITH_DIRTY_VALUES}
          render={({
            dirty,
            submitting,
            handleSubmit,
            hasValidationErrors,
          }) => {
            return (
              <>
                <section className="modal-card-body">
                  <div className="modal-form-content">
                    <div className="control">
                      <Field
                        showIcon
                        id="start_date"
                        className="input"
                        name="start_date"
                        validate={required}
                        component={CalendarInput}
                      />
                      <label htmlFor="startDate"> Start date</label>

                      {/* <ImageComponent src={CalendarSVG} alt="calendar icon" /> */}
                    </div>
                    <div className="control">
                      <Field
                        showIcon
                        id="end_date"
                        name="end_date"
                        className="input"
                        validate={required}
                        component={CalendarInput}
                      />
                      <label htmlFor="endDate"> End date</label>

                      {/* <ImageComponent src={CalendarSVG} alt="calendar icon" /> */}
                    </div>
                  </div>
                </section>
                <footer className="modal-card-foot">
                  <button type="button" onClick={closeModal} className="button">
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={submitting || !dirty || hasValidationErrors}
                    className={`button is-primary${
                      submitting ? " is-loading-custom" : ""
                    }`}
                  >
                    Update
                  </button>
                </footer>
              </>
            );
          }}
        />
      )}
    </div>
  );
};

DetailsModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  modalType: PropTypes.string.isRequired,
  setModalType: PropTypes.func.isRequired,
  mutateResources: PropTypes.func.isRequired,
  academicYear: PropTypes.instanceOf(Object).isRequired,
};

export default DetailsModal;
