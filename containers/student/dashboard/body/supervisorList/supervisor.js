import { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { confirmDialog } from "primereact/confirmdialog";

import { showNotification } from "../../../../../components/notification";
import initiateRequest from "../../../../../actions/student/initiateRequest";
import cancelSupervisionRequest from "../../../../../actions/student/cancelSupervisonRequest";
import { getUserInitials } from "../../../../../lib/objects";

const Supervisor = ({ supervisor, afterRequest, request }) => {
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
      message: "Confirm supervision request?",
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
    <div className="list-section-list-card-item">
      <div className="list-section-list-card-item-inner">
        <div className="list-section-list-card-initials-wrapper">
          {getUserInitials(supervisor.userDetails)}
        </div>
        <div>
          <h6>
            {`${supervisor.userDetails.firstName} ${supervisor.userDetails.lastName}`}
          </h6>
          <p>{supervisor.userDetails.department.name}</p>
        </div>
      </div>
      {request ? (
        <button
          type="button"
          onClick={onCancelRequest}
          className={`button${isSendingRequest ? " is-loading-custom" : ""}`}
        >
          Cancel
        </button>
      ) : (
        <button
          type="button"
          onClick={onSendRequest}
          className={`button${isSendingRequest ? " is-loading-custom" : ""}`}
        >
          Request
        </button>
      )}
    </div>
  );
};

Supervisor.defaultProps = { request: undefined };

Supervisor.propTypes = {
  request: PropTypes.instanceOf(Object),
  afterRequest: PropTypes.func.isRequired,
  supervisor: PropTypes.instanceOf(Object).isRequired,
};

export default Supervisor;
