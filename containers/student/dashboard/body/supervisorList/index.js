import useSWR from "swr";
import { useMemo } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useRouter } from "next/router";

import Supervisor from "./supervisor";
import { getPath } from "../../../../../config/urls";
import Suspense from "../../../../../components/suspense";
import { createStringifiedUrl } from "../../../../../lib/objects";
import getStudentRequests from "../../../../../actions/student/getStudentRequests";
import getAvailableSupervisors from "../../../../../actions/student/getAvailableSupervisors";
import SupervisorListSkeleton from "../../../../../components/skeletons/student/supervisorList";

const availableSupervisorsPath = getPath("availableSupervisorsPath").href;

const SupervisorList = ({
  auth,
  getStudentRequests,
  getAvailableSupervisors,
}) => {
  const router = useRouter();

  const baseUrl = useMemo(() => {
    if (!auth.user?.id) return "";

    const params = {
      pageSize: 3,
    };

    return createStringifiedUrl(
      getPath("availableSupervisorsPath").route,
      params,
    );
  }, [auth.user?.id]);

  const { data } = useSWR(baseUrl, getAvailableSupervisors);

  const studentRequestsUrl = useMemo(() => {
    return createStringifiedUrl(getPath("studentRequestsPath").route);
  }, []);

  const { data: existingRequestsData, mutate } = useSWR(
    studentRequestsUrl,
    getStudentRequests,
  );

  const existingRequests = useMemo(() => {
    if (!existingRequestsData?.result) return [];

    const requests = {};

    existingRequestsData.result.data.forEach((request) => {
      requests[request.supervisorDetails.id] = {
        requestId: request.id,
        supervisorId: request.supervisorDetails.id,
      };
    });
    return requests;
  }, [existingRequestsData?.result]);

  const afterRequest = () => mutate(studentRequestsUrl);

  const renderSupervisorsList = () => {
    return (
      <div className="list-section-right">
        <div className="dashboard-header">
          <div className="dashboard-header-inner">
            <h3>Supervisors</h3>
            <button
              type="button"
              className="button"
              onClick={() => router.push(availableSupervisorsPath)}
            >
              View all
            </button>
          </div>
        </div>
        <div className="list-section-list">
          {data.result.data.map((supervisor) => {
            const supervisorUserId = supervisor.userDetails.id;
            return (
              <Supervisor
                key={supervisor.id}
                supervisor={supervisor}
                afterRequest={afterRequest}
                request={existingRequests?.[supervisorUserId]}
              />
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
      component={renderSupervisorsList}
      skeleton={SupervisorListSkeleton}
    />
  );
};

SupervisorList.propTypes = {
  auth: PropTypes.instanceOf(Object).isRequired,
  getStudentRequests: PropTypes.func.isRequired,
  getAvailableSupervisors: PropTypes.func.isRequired,
};

export default connect(null, { getAvailableSupervisors, getStudentRequests })(
  SupervisorList,
);
