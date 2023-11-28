import PropTypes from "prop-types";

import authWrapper from "../../../containers/hoc/authWrapper";
import DashboardLayout from "../../../components/layout/dashboard";
import SystemConfigurationHeader from "../../../components/layout/dashboard/systemConfigurationHeader";
import CreateCourse from "../../../containers/superadmin/admins/systemConfiguration/courses/createCourse";

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
