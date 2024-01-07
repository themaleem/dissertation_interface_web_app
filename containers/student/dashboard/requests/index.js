import PropTypes from "prop-types";

import RequestBlock from "./requestBlock";
import StudentRequestsSkeleton from "../../../../components/skeletons/student/studentRequests";

const StudentRequests = ({ auth, data, afterAction }) => {
  const renderStudentRequests = () => {
    if (!data?.result) return <StudentRequestsSkeleton />;

    if (data.result.totalCount === 0) {
      return (
        <div className="request-card-list">
          <p>You have no pending or accepted supervision requests.</p>
        </div>
      );
    }

    return (
      <div className="request-card-list">
        {data.result.data.map((request) => (
          <RequestBlock
            key={request.id}
            request={request}
            afterAction={afterAction}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="section-wrapper">
      <div className="container">
        <div className="request-block">
          <div className="dashboard-header">
            <div className="dashboard-header-inner">
              <h3>Supervision requests</h3>
            </div>
          </div>
          {renderStudentRequests()}
        </div>
      </div>
    </div>
  );
};

StudentRequests.propTypes = {
  afterAction: PropTypes.func.isRequired,
  auth: PropTypes.instanceOf(Object).isRequired,
};

export default StudentRequests;
