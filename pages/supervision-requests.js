import PropTypes from "prop-types";

import authWrapper from "../containers/hoc/authWrapper";
import DashboardLayout from "../components/layout/dashboard";
import SupervisionRequestList from "../containers/superadmin/supervisionRequest";

const SupervisionRequestPage = ({ auth }) => {
  return (
    <DashboardLayout>
      <SupervisionRequestList auth={auth} />
    </DashboardLayout>
  );
};

SupervisionRequestPage.propTypes = {
  auth: PropTypes.instanceOf(Object).isRequired,
};

export default authWrapper(SupervisionRequestPage);
