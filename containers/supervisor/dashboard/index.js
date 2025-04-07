import PropTypes from "prop-types";
import { connect } from "react-redux";

import SupervisorRequests from "./requests";
import SupervisorDashboardBody from "./body/index";
import getStudentRequests from "../../../actions/student/getStudentRequests";

const SupervisorDashboard = ({ auth }) => {
  return (
    <>
      <section className="request-section has-top">
        <SupervisorRequests auth={auth} />
      </section>
      {/* @todo wrap in suspense component so data will be present before render */}
      <SupervisorDashboardBody
        auth={auth}
        // data={data}
        // hasApprovedRequest={hasApprovedRequest}
      />
    </>
  );
};

SupervisorDashboard.propTypes = {
  auth: PropTypes.instanceOf(Object).isRequired,
};

export default connect(null, { getStudentRequests })(SupervisorDashboard);
