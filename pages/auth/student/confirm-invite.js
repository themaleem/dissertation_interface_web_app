import PropTypes from "prop-types";

import Footer from "../../../components/layout/static/footer";
import authWrapper from "../../../containers/hoc/authWrapper";
import ConfirmStudentInvite from "../../../components/auth/student/confirmInvite";

const ConfirmStudentInvitePage = ({ auth }) => {
  return (
    <>
      <ConfirmStudentInvite auth={auth} />
      <Footer />
    </>
  );
};

ConfirmStudentInvitePage.propTypes = {
  auth: PropTypes.instanceOf(Object).isRequired,
};

export default authWrapper(ConfirmStudentInvitePage);
