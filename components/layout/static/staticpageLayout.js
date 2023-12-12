import PropTypes from "prop-types";
import { connect } from "react-redux";

import Header from "./header";
import Footer from "./footer";

const StaticPageLayout = ({ children, auth }) => {
  return (
    <main>
      <Header auth={auth} />
      {children}
      <Footer />
    </main>
  );
};
StaticPageLayout.propTypes = {
  children: PropTypes.node.isRequired,
  auth: PropTypes.instanceOf(Object).isRequired,
};

const mapStateToProps = ({ auth }) => ({
  auth,
});

export default connect(mapStateToProps, {})(StaticPageLayout);
