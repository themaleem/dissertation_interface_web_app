import { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { confirmDialog } from "primereact/confirmdialog";

import { timeAgo } from "../../../../lib/dateUtils";
import { capitalize } from "../../../../lib/objects";
import { showNotification } from "../../../../components/notification";
import acceptRequest from "../../../../actions/supervisor/acceptRequest";
import declineSupervisionRequest from "../../../../actions/supervisor/declineRequest";

const SupervisorRequestBlock = ({ request, afterAction }) => {
  const dispatch = useDispatch();
  const [isAccepting, setIsAccepting] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);

  const { id, status, studentDetails, createdAt } = request;

  const declineRequest = () => {
    setIsRejecting(true);
    const data = { requestId: id, comment: "Decline Request" };

    return dispatch(declineSupervisionRequest(data))
      .then(() => {
        showNotification({
          severity: "success",
          detail: "Request declined",
          summary: "Request has been declined!",
        });
        afterAction();
      })
      .catch((err) => showNotification({ detail: err.message }))
      .finally(() => {
        setIsRejecting(false);
      });
  };

  const onDeclineRequest = () => {
    confirmDialog({
      accept: declineRequest,
      icon: "pi pi-info-circle",
      header: "Decline Request?",
      acceptClassName: "button is-primary",
      message: "Are you sure you want to decline this request?",
    });
  };

  const acceptSupervisionRequest = () => {
    setIsAccepting(true);
    const payload = { requestId: request.id, comment: "Accept Request" };

    return acceptRequest(payload)
      .then(() => {
        afterAction();
        showNotification({
          severity: "success",
          detail: "Request Accepted",
          summary: "You have successfully accepted the supervision request!",
        });
      })
      .catch((err) => showNotification({ detail: err.message }))
      .finally(() => setIsAccepting(false));
  };

  const onAcceptRequest = () => {
    confirmDialog({
      accept: acceptSupervisionRequest,
      header: "Send Request?",
      icon: "pi pi-info-circle",
      acceptClassName: "button is-primary",
      message: "Confirm supervision request?",
    });
  };

  return (
    <div key={id} className="request-card-list-card-item">
      <div className="request-card-list-card-item-inner">
        <div className="request-card-list-card-header">
          <span
            className={`custom-tag${status === "approved" ? " green" : ""}`}
          >
            {capitalize(status)}
          </span>
          <div className="interpunct" />
          <span>{timeAgo(createdAt)}</span>
        </div>
        <h5>
          {studentDetails.firstName} {studentDetails.lastName}
        </h5>
        <p>{studentDetails.course.name}</p>

        <div className="btn-group">
          <button
            type="button"
            onClick={onAcceptRequest}
            disabled={isAccepting || isRejecting}
            className={`button is-primary${
              isAccepting ? " is-loading-custom" : ""
            }`}
          >
            Accept
          </button>
          <button
            type="button"
            onClick={onDeclineRequest}
            disabled={isAccepting || isRejecting}
            className={`button${isRejecting ? " is-loading-custom" : ""}`}
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
};

SupervisorRequestBlock.propTypes = {
  afterAction: PropTypes.func.isRequired,
  request: PropTypes.instanceOf(Object).isRequired,
};

export default SupervisorRequestBlock;
