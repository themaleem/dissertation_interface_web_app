import useSWR from "swr";
import { useMemo } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useRouter } from "next/router";

import RequestItem from "./requestItem";
import { getPath } from "../../../../config/urls";
import { createStringifiedUrl } from "../../../../lib/objects";
import getSupervisonRequests from "../../../../actions/superadmin/getSupervisionRequests";
import DashboardSupervisionRequests from "../../../../components/skeletons/superadmin/dashboardSupervisionRequests";

const supervisionRequestsPath = getPath("supervisionRequestsPath").href;

const SupervisionRequests = ({ auth, getSupervisonRequests }) => {
  const router = useRouter();

  const baseUrl = useMemo(() => {
    return createStringifiedUrl(getPath("supervisionRequestsPath").route, {
      pageSize: 3,
    });
  }, []);

  const { data } = useSWR(baseUrl, getSupervisonRequests);

  const navToSupervisionRequestsPage = () =>
    router.push(supervisionRequestsPath);

  const renderStudentRequests = () => {
    if (!data?.result) return <DashboardSupervisionRequests />;

    if (data.result.totalCount === 0) {
      return null;
    }

    return (
      <div className="request-card-list">
        {data.result.data.map((request) => (
          <RequestItem key={request.id} auth={auth} request={request} />
        ))}
      </div>
    );
  };

  return (
    <div className="request-block">
      <div className="dashboard-header">
        <div className="dashboard-header-inner">
          <h3>Supervision requests</h3>
          <button
            type="button"
            className="button"
            onClick={navToSupervisionRequestsPage}
          >
            View all
          </button>
        </div>
      </div>
      {renderStudentRequests()}
    </div>
  );
};

SupervisionRequests.propTypes = {
  auth: PropTypes.instanceOf(Object).isRequired,
  getSupervisonRequests: PropTypes.func.isRequired,
};

export default connect(null, { getSupervisonRequests })(SupervisionRequests);
