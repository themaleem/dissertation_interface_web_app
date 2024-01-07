import useSWR from "swr";
import { useMemo } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useRouter } from "next/router";

import UserCard from "../../common/userCard";
import { getPath } from "../../../config/urls";
import Suspense from "../../../components/suspense";
import { createStringifiedUrl } from "../../../lib/objects";
import getSupervisors from "../../../actions/supervisors/getSupervisors";
import DashboardUserCardsSkeleton from "../../../components/skeletons/superadmin/dashboardUserCards";

const supervisorsPath = getPath("supervisorsPath").href;

const DashboardSupervisorList = ({ auth, getSupervisors }) => {
  const router = useRouter();
  const navToSupervisorsListPage = () => router.push(supervisorsPath);

  const baseUrl = useMemo(() => {
    return createStringifiedUrl(getPath("supervisorsPath").route, {
      pageSize: 3,
    });
  }, []);

  const { data } = useSWR(baseUrl, getSupervisors);

  const renderDashboardSupervisorsList = () => {
    return (
      <div className="list-section-right">
        <div className="dashboard-header">
          <div className="dashboard-header-inner">
            <h3>Supervisors</h3>
            <button
              type="button"
              className="button"
              onClick={navToSupervisorsListPage}
            >
              View all
            </button>
          </div>
        </div>
        <div className="list-section-list">
          {data.result.data.map((user) => {
            const department = user.department.name;
            return (
              <UserCard user={user} key={user.id} department={department} />
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <Suspense
      hasData
      auth={auth}
      data={data?.result}
      skeleton={DashboardUserCardsSkeleton}
      component={renderDashboardSupervisorsList}
    />
  );
};

DashboardSupervisorList.propTypes = {
  getSupervisors: PropTypes.func.isRequired,
  auth: PropTypes.instanceOf(Object).isRequired,
};

export default connect(null, { getSupervisors })(DashboardSupervisorList);
