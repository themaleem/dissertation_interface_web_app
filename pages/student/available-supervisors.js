import PropTypes from "prop-types";

import authWrapper from "../../containers/hoc/authWrapper";
import DashboardLayout from "../../components/layout/dashboard";
import AvailableSupervisors from "../../containers/student/availableSupervisors";

const AvailableSupervisorsPage = ({ auth }) => {
  return (
    <DashboardLayout>
      <AvailableSupervisors auth={auth} />
    </DashboardLayout>
  );
};

AvailableSupervisorsPage.propTypes = {
  auth: PropTypes.instanceOf(Object).isRequired,
};

export default authWrapper(AvailableSupervisorsPage);
