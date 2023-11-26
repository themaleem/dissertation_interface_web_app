import PropTypes from "prop-types";

import authWrapper from "../../../containers/hoc/authWrapper";
import DashboardLayout from "../../../components/layout/dashboard";
import CreateCourse from "../../../containers/superadmin/admins/courses/createCourse";
import SystemConfigurationHeader from "../../../components/layout/dashboard/systemConfigurationHeader";

const CreateCoursePage = ({ auth }) => {
  return (
    <DashboardLayout>
      <SystemConfigurationHeader />
      <CreateCourse auth={auth} />
    </DashboardLayout>
  );
};

CreateCoursePage.propTypes = {
  auth: PropTypes.instanceOf(Object).isRequired,
};

export default authWrapper(CreateCoursePage);
