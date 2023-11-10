import PropTypes from "prop-types";
import { connect } from "react-redux";

// import Footer from "./footer";
import Header from "./header";

import "../../../public/styles/dashboard.css";

const DashboardLayout = ({ auth, children }) => {
  return (
    <>
      <Header auth={auth} />
      {children}
      {/* <Footer /> */}
    </>
  );
};

DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
const mapStateToProps = ({ auth }) => ({
  auth,
});

export default connect(mapStateToProps, {})(DashboardLayout);
