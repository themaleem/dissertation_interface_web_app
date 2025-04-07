import useSWR from "swr";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import React, { useCallback, useMemo } from "react";

import { getPath } from "../../../../config/urls";
import SupervisorRequestBlock from "./supervisorRequestBlock";
import { createStringifiedUrl } from "../../../../lib/objects";
import getSupervisonRequests from "../../../../actions/superadmin/getSupervisionRequests";
import StudentRequestsSkeleton from "../../../../components/skeletons/student/studentRequests";

const supervisorSupervisionRequestsPath = getPath(
  "supervisorSupervisionRequestsPath",
).href;

const SupervisorRequests = ({ auth, getSupervisonRequests }) => {
  const router = useRouter();

  const baseUrl = createStringifiedUrl(
    getPath("supervisorSupervisionRequestsPath").route,
    { pageSize: 3, FilterByStatus: "pending" },
  );

  const { data, mutate } = useSWR(baseUrl, getSupervisonRequests);

  const afterAction = useCallback(() => mutate(baseUrl), [baseUrl, mutate]);

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
          <SupervisorRequestBlock
            key={request.id}
            request={request}
            afterAction={afterAction}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="section-wrapper">
      <div className="container">
        <div className="request-block">
          <div className="dashboard-header">
            <div className="dashboard-header-inner">
              <h3>Pending requests</h3>
              <button
                type="button"
                className="button"
                onClick={() => router.push(supervisorSupervisionRequestsPath)}
              >
                View all
              </button>
            </div>
          </div>
          {renderStudentRequests()}
        </div>
      </div>
    </div>
  );
};

SupervisorRequests.propTypes = {
  auth: PropTypes.instanceOf(Object).isRequired,
  getSupervisonRequests: PropTypes.func.isRequired,
};

export default connect(null, { getSupervisonRequests })(SupervisorRequests);
