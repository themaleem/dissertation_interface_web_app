import useSWR from "swr";
import { useMemo } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import RequestItem from "./requestItem";
import { getPath } from "../../../../config/urls";
import { createStringifiedUrl } from "../../../../lib/objects";
import getSupervisonRequests from "../../../../actions/superadmin/getSupervisionRequests";
import DashboardSupervisionRequests from "../../../../components/skeletons/superadmin/dashboardSupervisionRequests";

const SupervisionRequests = ({ getSupervisonRequests }) => {
  const baseUrl = useMemo(() => {
    return createStringifiedUrl(getPath("supervisionRequestsPath").route, {
      pageSize: 3,
    });
  }, []);

  const { data } = useSWR(baseUrl, getSupervisonRequests);

  const renderStudentRequests = () => {
    if (!data?.result) return <DashboardSupervisionRequests />;

    if (data.result.totalCount === 0) {
      return null;
    }

    return (
      <div className="request-card-list">
        {data.result.data.map((request) => (
          <RequestItem key={request.id} request={request} />
        ))}
      </div>
    );
  };

  return (
    <div className="request-block">
      <div className="dashboard-header">
        <div className="dashboard-header-inner">
          <h3>Supervision requests</h3>
          <button type="button" className="button">
            View all
          </button>
        </div>
      </div>
      {renderStudentRequests()}
    </div>
  );
};

SupervisionRequests.propTypes = {
  getSupervisonRequests: PropTypes.func.isRequired,
};

export default connect(null, { getSupervisonRequests })(SupervisionRequests);
