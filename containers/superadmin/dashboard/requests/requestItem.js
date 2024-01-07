import PropTypes from "prop-types";
import { useCallback, useState } from "react";

import { capitalize } from "../../../../lib/objects";
import ModalWrapper from "../../../../components/modal";
import ImageComponent from "../../../../components/image";
import RequestDetailsModal from "../../../supervisionRequest/requestDetailsModal";
import CaretForwardImage from "../../../../public/images/caret-forward.svg";
import { timeAgo } from "../../../../lib/dateUtils";

const RequestItem = ({ auth, request }) => {
  const { status, studentDetails, supervisorDetails } = request;

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
      <div className="request-card-list-card-item" onClick={toggleDetailsModal}>
        <div className="request-card-list-card-item-inner">
          <div className="request-card-list-card-header">
            <span
              className={`custom-tag${status === "approved" ? " green" : ""}`}
            >
              {capitalize(status)}
            </span>
            <div className="interpunct" />
            <span>{timeAgo(request.createdAt)}</span>
          </div>
          <h5>
            {studentDetails.firstName} {studentDetails.lastName}
          </h5>
          <p>
            To {supervisorDetails.firstName} {supervisorDetails.lastName}
          </p>
        </div>
        <ImageComponent src={CaretForwardImage} alt="" />
      </div>
    </>
  );
};

RequestItem.propTypes = {
  request: PropTypes.instanceOf(Object).isRequired,
};

export default RequestItem;
