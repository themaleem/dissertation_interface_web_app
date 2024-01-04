import PropTypes from "prop-types";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { serialize as objectToFormData } from "object-to-formdata";

import ImageComponent from "../../../../../components/image";
import { showNotification } from "../../../../../components/notification";
import FileIconRed from "../../../../../public/images/basil_file-solid-red.svg";
import updateResearchProposal from "../../../../../actions/student/uploadResearchProposal";

const ResearchProposal = ({ afterRequest, researchProposalData }) => {
  const fileInputRef = useRef(null);
  const [isSendingRequest, setIsSendingRequest] = useState();

  const researchProposal = researchProposalData?.name;
  const researchProposalUrl = researchProposalData?.imageData;

  const dispatch = useDispatch();

  const triggerFileSelectPopup = () => fileInputRef.current.click();

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const data = objectToFormData({
        ResearchProposal: file,
      });

      return dispatch(updateResearchProposal(data))
        .then(() => {
          afterRequest();
          showNotification({
            severity: "success",
            summary: "Research proposal uploaded successfully!",
          });
        })
        .catch((err) => showNotification({ detail: err.message }))
        .finally(() => setIsSendingRequest(false));
    }
  };

  const handleProposalOpen = () => {
    if (!researchProposalUrl) return undefined;

    return window.open(researchProposalUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="list-section-list-card-item aligned-tp">
      <div
        onClick={handleProposalOpen}
        className="list-section-list-card-item-inner"
      >
        <div className="list-section-list-card-initials-wrapper">
          <ImageComponent src={FileIconRed} alt="file" />
        </div>
        <div>
          <h6>Research proposal</h6>
          <p>{researchProposal || ""}</p>
        </div>
      </div>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
        accept="application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/pdf"
      />
      <button
        type="button"
        onClick={triggerFileSelectPopup}
        className={`button${isSendingRequest ? " is-loading-custom" : ""}`}
      >
        Update
      </button>
    </div>
  );
};

ResearchProposal.defaultProps = {
  researchProposalData: undefined,
};

ResearchProposal.propTypes = {
  afterRequest: PropTypes.func.isRequired,
  researchProposalData: PropTypes.instanceOf(Object),
};

export default ResearchProposal;
