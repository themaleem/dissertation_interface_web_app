import PropTypes from "prop-types";

import authWrapper from "../../containers/hoc/authWrapper";
import DashboardLayout from "../../components/layout/dashboard";
import AdminUsersList from "../../containers/superadmin/admins";

const AdminUsersPage = ({ auth }) => {
  return (
    <DashboardLayout>
      <AdminUsersList auth={auth} />
    </DashboardLayout>
  );
};

AdminUsersPage.propTypes = {
  auth: PropTypes.instanceOf(Object).isRequired,
};

export default authWrapper(AdminUsersPage);
