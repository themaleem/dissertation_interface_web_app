import PropTypes from "prop-types";

import Profile from "./profile";
import SupervisorList from "./supervisorList";

const StudentDashboardBody = ({ auth }) => {
  return (
    <section className="list-section">
      <div className="section-wrapper">
        <div className="container">
          <Profile auth={auth} />
          <SupervisorList auth={auth} />
        </div>
      </div>
    </section>
  );
};

StudentDashboardBody.propTypes = {
  auth: PropTypes.instanceOf(Object).isRequired,
};

export default StudentDashboardBody;
