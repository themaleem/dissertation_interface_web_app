import { useMemo } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import AdminHeader from "./adminHeader";
import StudentHeader from "./studentHeader";
import SupervisorHeader from "./supervisorHeader";

import "../../../public/styles/dashboard.css";
import "../../../public/styles/empty-state.css";

const headers = {
  admin: AdminHeader,
  student: StudentHeader,
  superadmin: AdminHeader,
  supervisor: SupervisorHeader,
};

const DashboardLayout = ({ auth, children }) => {
  const role = useMemo(() => {
    if (!auth.user) return undefined;

    return auth.user.activeRole;
  }, [auth.user]);

  // @todo is supervisor header sufficient as a fallback header?
  const Header = headers[role] || SupervisorHeader;

  return (
    <main>
      <Header auth={auth} />
      {children}
    </main>
  );
};

DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
const mapStateToProps = ({ auth }) => ({
  auth,
});

export default connect(mapStateToProps, {})(DashboardLayout);
