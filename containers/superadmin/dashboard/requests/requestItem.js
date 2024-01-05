import PropTypes from "prop-types";

import { capitalize } from "../../../../lib/objects";
import ImageComponent from "../../../../components/image";
import CaretForwardImage from "../../../../public/images/caret-forward.svg";

const RequestItem = ({ request }) => {
  const { status, studentDetails, supervisorDetails } = request;
  return (
    <div className="request-card-list-card-item">
      <div className="request-card-list-card-item-inner">
        <div className="request-card-list-card-header">
          <span
            className={`custom-tag${status === "approved" ? " green" : ""}`}
          >
            {capitalize(status)}
          </span>
          <div className="interpunct" />
          <span>9 hours ago</span>
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
  );
};

RequestItem.propTypes = {
  request: PropTypes.instanceOf(Object).isRequired,
};

export default RequestItem;
