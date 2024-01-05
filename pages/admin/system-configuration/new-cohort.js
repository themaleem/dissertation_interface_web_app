import PropTypes from "prop-types";

import authWrapper from "../../../containers/hoc/authWrapper";
import DashboardLayout from "../../../components/layout/dashboard";

import CreateCohort from "../../../containers/superadmin/systemConfiguration/cohorts/createCohort";
import SystemConfigurationHeader from "../../../components/layout/dashboard/systemConfigurationHeader";

const CreateCohortPage = ({ auth }) => {
  return (
    <DashboardLayout>
      <SystemConfigurationHeader />
      <CreateCohort auth={auth} />
    </DashboardLayout>
  );
};

CreateCohortPage.propTypes = {
  auth: PropTypes.instanceOf(Object).isRequired,
};

export default authWrapper(CreateCohortPage);
