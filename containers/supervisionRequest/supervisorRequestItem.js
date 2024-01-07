import PropTypes from "prop-types";
import { useCallback, useState } from "react";

import { timeAgo } from "../../lib/dateUtils";
import ModalWrapper from "../../components/modal";
import RequestDetailsModal from "./requestDetailsModal";
import { capitalize, getSupervisionRequestClass } from "../../lib/objects";

const SupervisorRequestItem = ({ auth, request }) => {
  const {
    status,
    createdAt,
    studentDetails: {
      lastName,
      firstName,
      course: { name: courseName },
    },
  } = request;

  const [openDetailsModal, setOpenDetailsModal] = useState(false);

  const toggleDetailsModal = useCallback(() => {
    setOpenDetailsModal((open) => !open);
  }, []);

  const renderModal = () => {
    return (
      <ModalWrapper open={openDetailsModal} closeModal={toggleDetailsModal}>
        <RequestDetailsModal
          auth={auth}
          request={request}
          closeModal={toggleDetailsModal}
          studentUserId={request.studentDetails.id}
        />
      </ModalWrapper>
    );
  };

  return (
    <>
      {renderModal()}
      <div className="request-card-list-card-item">
        <div className="request-card-list-card-item-inner">
          <div className="request-card-list-card-header">
            <span className={`custom-tag${getSupervisionRequestClass(status)}`}>
              {capitalize(status)}
            </span>
            <div className="interpunct" />
            <span>{timeAgo(createdAt)}</span>
          </div>
          <h5>
            {firstName} {lastName}
          </h5>
          <p>{capitalize(courseName)}</p>
          <a onClick={toggleDetailsModal} className="request-card-link">
            View details
          </a>
        </div>
      </div>
    </>
  );
};

SupervisorRequestItem.propTypes = {
  auth: PropTypes.instanceOf(Object).isRequired,
  request: PropTypes.instanceOf(Object).isRequired,
};

export default SupervisorRequestItem;
