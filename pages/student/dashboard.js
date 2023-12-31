import PropTypes from "prop-types";

import authWrapper from "../../containers/hoc/authWrapper";
import DashboardLayout from "../../components/layout/dashboard";
import StudentDashboard from "../../containers/student/dashboard";

const SuperAdminPage = ({ auth }) => {
  return (
    <DashboardLayout>
      <StudentDashboard auth={auth} />
    </DashboardLayout>
  );
};

SuperAdminPage.propTypes = {
  auth: PropTypes.instanceOf(Object).isRequired,
};

export default authWrapper(SuperAdminPage);
