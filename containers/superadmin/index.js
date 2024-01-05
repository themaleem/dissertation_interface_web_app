import useSWR from "swr";
import { useMemo } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Counter from "./dashboard/counter";
import { getPath } from "../../config/urls";
import Suspense from "../../components/suspense";
import DashboardStudentList from "./dashboard/students";
import { createStringifiedUrl } from "../../lib/objects";
import DashboardSupervisorList from "./dashboard/supervisors";
import DashboardSupervisionRequests from "./dashboard/requests";
import getActiveMetrics from "../../actions/superadmin/getActiveMetrics";
import MetricCounter from "../../components/skeletons/superadmin/metricCounter";

const SuperadminDashboard = ({ auth, getActiveMetrics }) => {
  const baseUrl = createStringifiedUrl(getPath("cohortMetricsPath").route);

  const { data } = useSWR(baseUrl, getActiveMetrics);

  const counterBoxItems = useMemo(() => {
    if (!data) return [];

    return [
      {
        title: "Students",
        end: data.students,
      },
      {
        title: "Supervisors",
        end: data.supervisors,
      },
      {
        title: "Approved",
        className: " is-success",
        end: data.approvedRequests,
      },
      {
        title: "Declined",
        className: " is-danger",
        end: data.declinedRequests,
      },
    ];
  }, [data]);

  const renderCounterSection = () => {
    return counterBoxItems.map((item) => (
      <div
        key={item.title}
        className={`overview-card-list-item${
          item.className ? item.className : ""
        }`}
      >
        <Counter end={item.end} />
        <p>{item.title}</p>
      </div>
    ));
  };

  const renderCounterSectionSkeleton = () => <MetricCounter />;

  return (
    <>
      <section className="overview-section">
        <div className="container">
          <div className="overview-block">
            <div className="dashboard-header">
              <div className="dashboard-header-inner">
                <h3>Overview</h3>
              </div>
            </div>
            <div className="overview-card-list">
              <Suspense
                hasData
                auth={auth}
                component={renderCounterSection}
                skeleton={renderCounterSectionSkeleton}
                data={data ? counterBoxItems : undefined}
              />
            </div>
          </div>
        </div>
      </section>
      <section className="request-section">
        <div className="container">
          <DashboardSupervisionRequests auth={auth} />
        </div>
      </section>
      <section className="list-section">
        <div className="container">
          <DashboardStudentList auth={auth} />
          <DashboardSupervisorList auth={auth} />
        </div>
      </section>
    </>
  );
};

SuperadminDashboard.propTypes = {
  getActiveMetrics: PropTypes.func.isRequired,
  auth: PropTypes.instanceOf(Object).isRequired,
};

export default connect(null, { getActiveMetrics })(SuperadminDashboard);
