import PropTypes from "prop-types";

import authWrapper from "../../../containers/hoc/authWrapper";
import DashboardLayout from "../../../components/layout/dashboard";
import Departments from "../../../containers/superadmin/admins/departments";
import SystemConfigurationHeader from "../../../components/layout/dashboard/systemConfigurationHeader";

const AcademicYearPage = ({ auth }) => {
  return (
    <DashboardLayout>
      <SystemConfigurationHeader />
      <Departments auth={auth} />
    </DashboardLayout>
  );
};

AcademicYearPage.propTypes = {
  auth: PropTypes.instanceOf(Object).isRequired,
};

export default authWrapper(AcademicYearPage);
