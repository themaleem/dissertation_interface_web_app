import PropTypes from "prop-types";

import authWrapper from "../../../containers/hoc/authWrapper";
import DashboardLayout from "../../../components/layout/dashboard";
import SystemConfigurationHeader from "../../../components/layout/dashboard/systemConfigurationHeader";
import CreateAcademicYear from "../../../containers/superadmin/admins/systemConfiguration/academicYear/createAcademicYear";

const NewAcademicYear = ({ auth }) => {
  return (
    <DashboardLayout>
      <SystemConfigurationHeader />
      <CreateAcademicYear auth={auth} />
    </DashboardLayout>
  );
};

NewAcademicYear.propTypes = {
  auth: PropTypes.instanceOf(Object).isRequired,
};

export default authWrapper(NewAcademicYear);
