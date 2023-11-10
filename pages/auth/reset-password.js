import PropTypes from "prop-types";

import ResetPassword from "../../components/auth/resetPassword";
import Footer from "../../components/layout/static/footer";
import authWrapper from "../../containers/hoc/authWrapper";

const ResetPasswordPage = ({ auth }) => {
  return (
    <>
      <ResetPassword auth={auth} />
      <Footer />
    </>
  );
};

ResetPasswordPage.propTypes = {
  auth: PropTypes.instanceOf(Object).isRequired,
};

export default authWrapper(ResetPasswordPage);
