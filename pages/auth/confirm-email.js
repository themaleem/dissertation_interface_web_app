import PropTypes from "prop-types";

import ConfirmEmail from "../../components/auth/confirmEmail";
import Footer from "../../components/layout/static/footer";
import authWrapper from "../../containers/hoc/authWrapper";

const ConfirEmailPage = ({ auth }) => {
  return (
    <>
      <ConfirmEmail auth={auth} />
      <Footer />
    </>
  );
};

ConfirEmailPage.propTypes = {
  auth: PropTypes.instanceOf(Object).isRequired,
};

export default authWrapper(ConfirEmailPage);
