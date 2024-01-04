import PropTypes from "prop-types";

import StudentDashboardBody from "./body";
import StudentRequests from "./requests";

const StudentDashboard = ({ auth }) => {
  return (
    <>
      <StudentRequests auth={auth} />
      <StudentDashboardBody auth={auth} />
    </>
  );
};

StudentDashboard.propTypes = {
  auth: PropTypes.instanceOf(Object).isRequired,
};

export default StudentDashboard;
