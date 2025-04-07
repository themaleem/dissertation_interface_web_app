import { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { confirmDialog } from "primereact/confirmdialog";

import PicImage from "../../../public/images/pic.png";
import ImageComponent from "../../../components/image";
import CloseSVGImage from "../../../public/images/close.svg";
import PeopleIconSvg from "../../../public/images/people.svg";
import FileIcon from "../../../public/images/basil_file-solid.svg";
import { showNotification } from "../../../components/notification";
import initiateRequest from "../../../actions/student/initiateRequest";
import cancelSupervisionRequest from "../../../actions/student/cancelSupervisonRequest";

const SupervisorDetailsModal = ({
  request,
  supervisor,
  closeModal,
  afterRequest,
}) => {
  const dispatch = useDispatch();

  const [isSendingRequest, setIsSendingRequest] = useState();

  const sendRequest = () => {
    setIsSendingRequest(true);
    const data = { supervisorId: supervisor.userDetails.id };
    return dispatch(initiateRequest(data))
      .then(() => {
        afterRequest();
        showNotification({
          severity: "success",
          detail: "Request Sent",
          summary: "Supervison request has been sent!",
        });
      })
      .catch((err) => showNotification({ detail: err.message }))
      .finally(() => setIsSendingRequest(false));
  };

  const onSendRequest = () => {
    confirmDialog({
      accept: sendRequest,
      header: "Send Request?",
      icon: "pi pi-info-circle",
      acceptClassName: "button is-primary",
      message: "Are you sure you want to send supervision request?",
    });
  };

  const cancelRequest = () => {
    setIsSendingRequest(true);
    const data = {
      comment: "Cancel Request",
      requestId: request.requestId,
    };
    return dispatch(cancelSupervisionRequest(data))
      .then(() => {
        showNotification({
          severity: "success",
          detail: "Request Sent",
          summary: "Supervison request has been cancelled!",
        });
        afterRequest();
      })
      .catch((err) => showNotification({ detail: err.message }))
      .finally(() => setIsSendingRequest(false));
  };

  const onCancelRequest = () => {
    confirmDialog({
      accept: cancelRequest,
      header: "Cancel Request?",
      icon: "pi pi-info-circle",
      acceptClassName: "button is-primary",
      message: "Confirm supervision request cancellation?",
    });
  };

  return (
    <div className="modal-card">
      <header className="modal-card-head">
        <p className="modal-card-title">Supervisor detail</p>
        <button
          type="button"
          aria-label="close"
          onClick={closeModal}
          className="close-btn"
        >
          <ImageComponent src={CloseSVGImage} alt="close icon" />
        </button>
      </header>
      <section className="modal-card-body">
        <div className="modal-stacked-content">
          <div className="list-section-list-card-item aligned-tp">
            <div className="list-section-list-card-item-inner">
              <div className="list-section-list-card-initials-wrapper">
                <ImageComponent src={PicImage} alt="user-profile-icon" />
              </div>
              <div>
                <h6>
                  {`${supervisor.userDetails.firstName} 
                  ${supervisor.userDetails.lastName}`}
                </h6>
                <p className="sub">{supervisor.userDetails.email}</p>
                <p className="sm">{supervisor.userDetails.department.name}</p>
              </div>
            </div>
          </div>
          <div className="list-section-list-card-item aligned-tp">
            <div className="list-section-list-card-item-inner">
              <div className="list-section-list-card-initials-wrapper blu-bg">
                <ImageComponent src={FileIcon} alt="file" />
              </div>
              <div>
                <h6>Research topic</h6>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Aliquam gravida libero ac laoreet vehicula. Sed tortor nunc,
                  mattis vitae ante quis, dignissim lobortis arcu. Integer sed
                  arcu vel libero convallis semper. Aliquam vehicula efficitur
                  accumsan.
                </p>
              </div>
            </div>
          </div>
          <div className="list-section-list-card-item aligned-tp">
            <div className="list-section-list-card-item-inner">
              <div className="list-section-list-card-initials-wrapper is-grey">
                <ImageComponent src={PeopleIconSvg} alt="people-icon" />
              </div>
              <div>
                <h6>Available Supervision slot</h6>
                <p className="lg">{supervisor.availableSupervisionSlot}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer className="modal-card-foot">
        {request ? (
          <button
            type="button"
            onClick={onCancelRequest}
            className={`button is-primary${
              isSendingRequest ? " is-loading-custom" : ""
            }`}
          >
            Cancel Request
          </button>
        ) : (
          <button
            type="button"
            onClick={onSendRequest}
            className={`button is-primary${
              isSendingRequest ? " is-loading-custom" : ""
            }`}
          >
            Send Request
          </button>
        )}
      </footer>
    </div>
  );
};

SupervisorDetailsModal.defaultProps = {
  request: undefined,
  supervisor: undefined,
};

SupervisorDetailsModal.propTypes = {
  request: PropTypes.instanceOf(Object),
  closeModal: PropTypes.func.isRequired,
  afterRequest: PropTypes.func.isRequired,
  supervisor: PropTypes.instanceOf(Object),
};

export default SupervisorDetailsModal;
