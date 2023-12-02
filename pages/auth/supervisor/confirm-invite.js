import PropTypes from "prop-types";

import Footer from "../../../components/layout/static/footer";
import authWrapper from "../../../containers/hoc/authWrapper";
import ConfirmSupervisorInvite from "../../../components/auth/supervisor/confirmInvite";

const ConfirmSupervisorInvitePage = ({ auth }) => {
  return (
    <>
      <ConfirmSupervisorInvite auth={auth} />
      <Footer />
    </>
  );
};

ConfirmSupervisorInvitePage.propTypes = {
  auth: PropTypes.instanceOf(Object).isRequired,
};

export default authWrapper(ConfirmSupervisorInvitePage);
