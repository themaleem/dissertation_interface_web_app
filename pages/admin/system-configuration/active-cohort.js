import PropTypes from "prop-types";

import authWrapper from "../../../containers/hoc/authWrapper";
import DashboardLayout from "../../../components/layout/dashboard";
import DissertationCohort from "../../../containers/dissertationCohort";

const DissertationCohortPage = ({ auth }) => {
  return (
    <DashboardLayout>
      <DissertationCohort auth={auth} />
    </DashboardLayout>
  );
};

DissertationCohortPage.propTypes = {
  auth: PropTypes.instanceOf(Object).isRequired,
};

export default authWrapper(DissertationCohortPage);
