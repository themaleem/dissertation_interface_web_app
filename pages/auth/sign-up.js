import PropTypes from "prop-types";

import SignUp from "../../components/auth/signUp";
import Footer from "../../components/layout/static/footer";
import authWrapper from "../../containers/hoc/authWrapper";

const SignUpPage = ({ auth }) => {
  return (
    <>
      <SignUp />
      <Footer />
    </>
  );
};

SignUpPage.propTypes = { auth: PropTypes.instanceOf(Object).isRequired };

export default authWrapper(SignUpPage);
