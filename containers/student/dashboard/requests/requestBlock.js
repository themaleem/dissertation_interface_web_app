import { useState } from "react";
import PropTypes from "prop-types";
import { capitalize } from "lodash";
import { useDispatch } from "react-redux";
import { confirmDialog } from "primereact/confirmdialog";

import { timeAgo } from "../../../../lib/dateUtils";
import { showNotification } from "../../../../components/notification";
import cancelSupervisionRequest from "../../../../actions/student/cancelSupervisonRequest";

const RequestBlock = ({ request, afterAction }) => {
  const dispatch = useDispatch();
  const [isSendingRequest, setIsSendingRequest] = useState();

  const { id, status, supervisorDetails, createdAt } = request;

  const cancelRequest = () => {
    setIsSendingRequest(true);
    const data = { requestId: id, comment: "Cancel Request" };

    return dispatch(cancelSupervisionRequest(data))
      .then(() => {
        showNotification({
          severity: "success",
          detail: "Request Cancelled",
          summary: "Request has been cancelled!",
        });
        afterAction();
      })
      .catch((err) => showNotification({ detail: err.message }))
      .finally(() => {
        setIsSendingRequest(false);
      });
  };

  const onCancelRequest = () => {
    confirmDialog({
      accept: cancelRequest,
      icon: "pi pi-info-circle",
      header: "Cancel Request?",
      acceptClassName: "button is-primary",
      message: "Are you sure you want to cancel this supervision request?",
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
          {supervisorDetails.firstName} {supervisorDetails.lastName}
        </h5>
        <p>{supervisorDetails.department.name}</p>
        {status === "pending" && (
          <div className="btn-group">
            <button
              type="button"
              onClick={onCancelRequest}
              disabled={isSendingRequest}
              className={`button${
                isSendingRequest ? " is-loading-custom" : ""
              }`}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

RequestBlock.propTypes = {
  afterAction: PropTypes.func.isRequired,
  request: PropTypes.instanceOf(Object).isRequired,
};

export default RequestBlock;
