import PropTypes from "prop-types";

import authWrapper from "../../containers/hoc/authWrapper";
import SuperadminDashboard from "../../containers/superadmin";
import DashboardLayout from "../../components/layout/dashboard";

const SuperAdminPage = ({ auth }) => {
  return (
    <DashboardLayout>
      <SuperadminDashboard auth={auth} />
    </DashboardLayout>
  );
};

SuperAdminPage.propTypes = {
  auth: PropTypes.instanceOf(Object).isRequired,
};

export default authWrapper(SuperAdminPage);
