import useSWR from "swr";
import { useMemo } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import RequestBlock from "./requestBlock";
import { getPath } from "../../../../config/urls";
import { createStringifiedUrl } from "../../../../lib/objects";
import getStudentRequests from "../../../../actions/student/getStudentRequests";
import StudentRequestsSkeleton from "../../../../components/skeletons/student/studentRequests";

const StudentRequests = ({ auth, getStudentRequests }) => {
  const baseUrl = useMemo(() => {
    return createStringifiedUrl(getPath("studentRequestsPath").route);
  }, []);

  const { data, mutate } = useSWR(baseUrl, getStudentRequests);

  const renderStudentRequests = () => {
    if (!data?.result) return <StudentRequestsSkeleton />;

    if (data.result.totalCount === 0) {
      return (
        <div className="request-card-list">
          <p>You have no pending or accepted supervision requests.</p>
        </div>
      );
    }

    return (
      <div className="request-card-list">
        {data.result.data.map((request) => (
          <RequestBlock
            mutate={mutate}
            key={request.id}
            baseUrl={baseUrl}
            request={request}
          />
        ))}
      </div>
    );
  };

  return (
    <section className="request-section has-top">
      <div className="section-wrapper">
        <div className="container">
          <div className="request-block">
            <div className="dashboard-header">
              <div className="dashboard-header-inner">
                <h3>Supervision requests</h3>
              </div>
            </div>
            {renderStudentRequests()}
          </div>
        </div>
      </div>
    </section>
  );
};

StudentRequests.propTypes = {
  auth: PropTypes.instanceOf(Object).isRequired,
  getStudentRequests: PropTypes.func.isRequired,
};

export default connect(null, { getStudentRequests })(StudentRequests);
