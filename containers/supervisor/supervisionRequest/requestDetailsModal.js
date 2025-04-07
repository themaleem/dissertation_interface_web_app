import useSWR from "swr";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useMemo, useState } from "react";
import { confirmDialog } from "primereact/confirmdialog";

import { getPath } from "../../../config/urls";
import Suspense from "../../../components/suspense";
import ImageComponent from "../../../components/image";
import { createStringifiedUrl } from "../../../lib/objects";
import getStudent from "../../../actions/student/getStudent";
import CloseSVGImage from "../../../public/images/close.svg";
import FileIcon from "../../../public/images/basil_file-solid.svg";
import UserImageOrInitials from "../../common/userImageOrInitials";
import { showNotification } from "../../../components/notification";
import acceptRequest from "../../../actions/supervisor/acceptRequest";
import declineRequest from "../../../actions/supervisor/declineRequest";
import FileIconRed from "../../../public/images/basil_file-solid-red.svg";
import RequestDetailModalSkeleton from "../../../components/skeletons/supervisor/requestDetailModal";

const RequestDetailsModal = ({
  auth,
  isAdmin,
  request,
  closeModal,
  getStudent,
  afterAction,
  acceptRequest,
  studentUserId,
  declineRequest,
}) => {
  const [isSendingRequest, setIsSendingRequest] = useState();

  const baseUrl = useMemo(() => {
    return createStringifiedUrl(
      getPath("studentPath", { id: studentUserId }).as,
    );
  }, [studentUserId]);

  const { data } = useSWR(baseUrl, getStudent);

  const acceptSupervisionRequest = () => {
    setIsSendingRequest(true);
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
      .finally(() => setIsSendingRequest(false));
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

  const cancelRequest = () => {
    setIsSendingRequest(true);
    const payload = { requestId: request.id, comment: "Decline Request" };

    return declineRequest(payload)
      .then(() => {
        showNotification({
          severity: "success",
          detail: "Request Declined",
          summary: "You have successfully declined the supervision request!",
        });
        afterAction();
      })
      .catch((err) => showNotification({ detail: err.message }))
      .finally(() => setIsSendingRequest(false));
  };

  const onCancelRequest = () => {
    confirmDialog({
      accept: cancelRequest,
      header: "Decline Request?",
      icon: "pi pi-info-circle",
      acceptClassName: "button is-primary",
      message: "Confirm supervision request cancellation?",
    });
  };

  const {
    supervisorDetails: {
      department: { name: departmentName },
      email,
      lastName,
      firstName,
      profilePicture: pprofilePictureData,
    },
  } = request;

  const renderStudentProfile = () => {
    const {
      studentDetails: { course, researchTopic, researchProposal },
      userDetails: { user, profilePicture },
    } = data.result;

    const researchProposalName = researchProposal?.name;
    const researchProposalUrl = researchProposal?.imageData;

    const handleProposalOpen = () => {
      if (!researchProposalUrl) return undefined;

      return window.open(researchProposalUrl, "_blank", "noopener,noreferrer");
    };

    return (
      <>
        <section className="modal-card-body">
          <div className="modal-stacked-content">
            {isAdmin && (
              <div className="list-section-list-card-item aligned-tp">
                <div className="list-section-list-card-item-inner">
                  <div className="list-section-list-card-initials-wrapper">
                    <UserImageOrInitials
                      user={{ lastName, firstName }}
                      profilePictureData={pprofilePictureData}
                    />
                  </div>
                  <div>
                    <h6>
                      {firstName} {lastName}
                    </h6>
                    <p className="sub">{email}</p>
                    <p className="sm">{departmentName}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="list-section-list-card-item aligned-tp">
              <div className="list-section-list-card-item-inner">
                <div className="list-section-list-card-initials-wrapper">
                  <UserImageOrInitials
                    user={user}
                    profilePictureData={profilePicture}
                  />
                </div>
                <div>
                  <h6>
                    {user.firstName} {user.lastName}
                  </h6>
                  <p className="sub">{user.email}</p>
                  <p className="sm">{course.name}</p>
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
                  <p>{researchTopic || "No Research Topic yet"}</p>
                </div>
              </div>
            </div>
            <div
              onClick={handleProposalOpen}
              className="list-section-list-card-item aligned-tp"
            >
              <div className="list-section-list-card-item-inner">
                <div className="list-section-list-card-initials-wrapper is-grey">
                  <ImageComponent src={FileIconRed} alt="file-icon-red" />
                </div>
                <div>
                  <h6>Research Proposal</h6>
                  <p>{researchProposalName || "No Proposal yet"}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {request.status === "pending" && (
          <footer className="modal-card-foot">
            <button
              type="button"
              className="button"
              onClick={onCancelRequest}
              disabled={isSendingRequest}
            >
              Decline Request
            </button>

            <button
              type="button"
              onClick={onAcceptRequest}
              disabled={isSendingRequest}
              className={`button is-primary${
                isSendingRequest ? " is-loading-custom" : ""
              }`}
            >
              Accept Request
            </button>
          </footer>
        )}
      </>
    );
  };

  return (
    <div className="modal-card">
      <header className="modal-card-head">
        <p className="modal-card-title">Request detail</p>
        <button
          type="button"
          aria-label="close"
          onClick={closeModal}
          className="close-btn"
        >
          <ImageComponent src={CloseSVGImage} alt="close icon" />
        </button>
      </header>

      <Suspense
        hasData
        auth={auth}
        data={data?.result}
        component={renderStudentProfile}
        skeleton={RequestDetailModalSkeleton}
      />
    </div>
  );
};

RequestDetailsModal.defaultProps = {
  isAdmin: false,
};

RequestDetailsModal.propTypes = {
  isAdmin: PropTypes.bool,
  closeModal: PropTypes.func.isRequired,
  acceptRequest: PropTypes.func.isRequired,
  declineRequest: PropTypes.func.isRequired,
  studentUserId: PropTypes.string.isRequired,
  auth: PropTypes.instanceOf(Object).isRequired,
  request: PropTypes.instanceOf(Object).isRequired,
};

export default connect(null, { getStudent, acceptRequest, declineRequest })(
  RequestDetailsModal,
);
