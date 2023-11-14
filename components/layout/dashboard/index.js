import PropTypes from "prop-types";
import { connect } from "react-redux";

import Header from "./adminHeader";

import "../../../public/styles/dashboard.css";

const DashboardLayout = ({ auth, children }) => {
  return (
    <>
      <Header auth={auth} />
      {children}
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
