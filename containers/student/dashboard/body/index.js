import PropTypes from "prop-types";

import Profile from "./profile";
import SupervisorList from "./supervisorList";
import ApprovedSupervisor from "../approvedSupervisor";

const StudentDashboardBody = ({ auth, data, hasApprovedRequest }) => {
  return (
    <section className="list-section">
      <div className="section-wrapper">
        <div className="container">
          <Profile auth={auth} />
          {hasApprovedRequest ? (
            <ApprovedSupervisor data={data} auth={auth} />
          ) : (
            <SupervisorList auth={auth} />
          )}
        </div>
      </div>
    </section>
  );
};

StudentDashboardBody.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  hasApprovedRequest: PropTypes.bool.isRequired,
  auth: PropTypes.instanceOf(Object).isRequired,
};

export default StudentDashboardBody;
