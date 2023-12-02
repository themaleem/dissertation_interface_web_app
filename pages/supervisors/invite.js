import PropTypes from "prop-types";

import authWrapper from "../../containers/hoc/authWrapper";
import DashboardLayout from "../../components/layout/dashboard";
import CreateSupervisorInvite from "../../containers/supervisors/invites/createInvite";

const NewSupervisor = ({ auth }) => {
  return (
    <DashboardLayout>
      <CreateSupervisorInvite auth={auth} />
    </DashboardLayout>
  );
};

NewSupervisor.propTypes = {
  auth: PropTypes.instanceOf(Object).isRequired,
};

export default authWrapper(NewSupervisor);
