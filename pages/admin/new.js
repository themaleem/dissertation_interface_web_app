import PropTypes from "prop-types";

import authWrapper from "../../containers/hoc/authWrapper";
import DashboardLayout from "../../components/layout/dashboard";
import CreateAdmin from "../../containers/superadmin/admins/createAdmin";

const CreateAdminPage = ({ auth }) => {
  return (
    <DashboardLayout>
      <CreateAdmin auth={auth} />
    </DashboardLayout>
  );
};

CreateAdminPage.propTypes = {
  auth: PropTypes.instanceOf(Object).isRequired,
};

export default authWrapper(CreateAdminPage);
