import PropTypes from "prop-types";

import authWrapper from "../../../containers/hoc/authWrapper";
import DashboardLayout from "../../../components/layout/dashboard";
import SystemConfigurationHeader from "../../../components/layout/dashboard/systemConfigurationHeader";
import SystemConfiguration from "../../../containers/superadmin/admins/systemConfiguration";

const AcademicYearPage = ({ auth }) => {
  return (
    <DashboardLayout>
      <SystemConfigurationHeader />
      <SystemConfiguration auth={auth} />
    </DashboardLayout>
  );
};

AcademicYearPage.propTypes = {
  auth: PropTypes.instanceOf(Object).isRequired,
};

export default authWrapper(AcademicYearPage);
