import useSWR from "swr";
import { useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import StudentRequests from "./requests";
import StudentDashboardBody from "./body";
import { getPath } from "../../../config/urls";
import { createStringifiedUrl } from "../../../lib/objects";
import getStudentRequests from "../../../actions/student/getStudentRequests";

const StudentDashboard = ({ auth, getStudentRequests }) => {
  const baseUrl = useMemo(() => {
    return createStringifiedUrl(getPath("studentRequestsPath").route);
  }, []);

  const { data, mutate } = useSWR(baseUrl, getStudentRequests);

  const afterAction = useCallback(() => mutate(baseUrl), [baseUrl, mutate]);

  const hasApprovedRequest = data?.result?.data?.some(
    (request) => request.status === "approved",
  );

  return (
    <>
      <section className="request-section has-top">
        {!hasApprovedRequest && (
          <StudentRequests auth={auth} data={data} afterAction={afterAction} />
        )}
      </section>
      <StudentDashboardBody
        auth={auth}
        data={data}
        hasApprovedRequest={hasApprovedRequest}
      />
    </>
  );
};

StudentDashboard.propTypes = {
  auth: PropTypes.instanceOf(Object).isRequired,
};

export default connect(null, { getStudentRequests })(StudentDashboard);
