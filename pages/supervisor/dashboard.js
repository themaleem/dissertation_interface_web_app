import PropTypes from "prop-types";

import authWrapper from "../../containers/hoc/authWrapper";
import SupervisorDashboard from "../../containers/supervisor/dashboard";
import DashboardLayout from "../../components/layout/dashboard";

const SuperAdminPage = ({ auth }) => {
  return (
    <DashboardLayout>
      <SupervisorDashboard auth={auth} />
    </DashboardLayout>
  );
};

SuperAdminPage.propTypes = {
  auth: PropTypes.instanceOf(Object).isRequired,
};

export default authWrapper(SuperAdminPage);
