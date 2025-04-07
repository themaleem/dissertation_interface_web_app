import PropTypes from "prop-types";

import authWrapper from "../../containers/hoc/authWrapper";
import DashboardLayout from "../../components/layout/dashboard";
import SupervisorDashboard from "../../containers/supervisor/dashboard";

const SupervisorDashboardPage = ({ auth }) => {
  return (
    <DashboardLayout>
      <SupervisorDashboard auth={auth} />
    </DashboardLayout>
  );
};

SupervisorDashboardPage.propTypes = {
  auth: PropTypes.instanceOf(Object).isRequired,
};

export default authWrapper(SupervisorDashboardPage);
