import PropTypes from "prop-types";

import authWrapper from "../../containers/hoc/authWrapper";
import DashboardLayout from "../../components/layout/dashboard";
import CreateStudentInvite from "../../containers/students/invites/createInvite";

const NewSupervisor = ({ auth }) => {
  return (
    <DashboardLayout>
      <CreateStudentInvite auth={auth} />
    </DashboardLayout>
  );
};

NewSupervisor.propTypes = {
  auth: PropTypes.instanceOf(Object).isRequired,
};

export default authWrapper(NewSupervisor);
