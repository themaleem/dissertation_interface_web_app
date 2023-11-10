import PropTypes from "prop-types";

import Footer from "../../components/layout/static/footer";
import ForgotPassword from "../../components/auth/forgotPassword";
import authWrapper from "../../containers/hoc/authWrapper";

const ForgotPasswordPage = ({ auth }) => {
  return (
    <>
      <ForgotPassword />
      <Footer />
    </>
  );
};

ForgotPasswordPage.propTypes = {
  auth: PropTypes.instanceOf(Object).isRequired,
};

export default authWrapper(ForgotPasswordPage);
