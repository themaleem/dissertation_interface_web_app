import PropTypes from "prop-types";

import authWrapper from "../../../containers/hoc/authWrapper";
import DashboardLayout from "../../../components/layout/dashboard";
import Cohorts from "../../../containers/superadmin/admins/cohorts";
import SystemConfigurationHeader from "../../../components/layout/dashboard/systemConfigurationHeader";

const AcademicYearPage = ({ auth }) => {
  return (
    <DashboardLayout>
      <SystemConfigurationHeader />
      <Cohorts auth={auth} />
    </DashboardLayout>
  );
};

AcademicYearPage.propTypes = {
  auth: PropTypes.instanceOf(Object).isRequired,
};

export default authWrapper(AcademicYearPage);
