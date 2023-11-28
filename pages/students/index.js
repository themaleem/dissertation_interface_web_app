import PropTypes from "prop-types";

import authWrapper from "../../containers/hoc/authWrapper";
import DashboardLayout from "../../components/layout/dashboard";
import AdminUsersList from "../../containers/superadmin/admins";

const StudentsPage = ({ auth }) => {
  return (
    <DashboardLayout>
      <AdminUsersList auth={auth} />
    </DashboardLayout>
  );
};

StudentsPage.propTypes = {
  auth: PropTypes.instanceOf(Object).isRequired,
};

export default authWrapper(StudentsPage);
