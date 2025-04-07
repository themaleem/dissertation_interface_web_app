import useSWR from "swr";
import { useMemo } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useRouter } from "next/router";

import UserCard from "../../common/userCard";
import { getPath } from "../../../config/urls";
import Suspense from "../../../components/suspense";
import { createStringifiedUrl } from "../../../lib/objects";
import getStudents from "../../../actions/students/getStudents";
import DashboardUserCardsSkeleton from "../../../components/skeletons/superadmin/dashboardUserCards";

const studentsPath = getPath("studentsPath").href;

const DashboardSupervisorList = ({ auth, getStudents }) => {
  const router = useRouter();

  const navToStudentsListPage = () => router.push(studentsPath);

  const baseUrl = useMemo(() => {
    return createStringifiedUrl(getPath("studentsPath").route, { pageSize: 3 });
  }, []);

  const { data } = useSWR(baseUrl, getStudents);

  const renderDashboardSupervisorsList = () => {
    return (
      <div className="list-section-left">
        <div className="dashboard-header">
          <div className="dashboard-header-inner">
            <h3>Students</h3>
            <button
              type="button"
              className="button"
              onClick={navToStudentsListPage}
            >
              View all
            </button>
          </div>
        </div>
        <div className="list-section-list">
          {data?.result?.data?.map((user) => {
            const department = user.course.name;

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
  getStudents: PropTypes.func.isRequired,
  auth: PropTypes.instanceOf(Object).isRequired,
};

export default connect(null, { getStudents })(DashboardSupervisorList);
