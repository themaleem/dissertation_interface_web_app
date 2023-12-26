import useSWR from "swr";
import { useMemo } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Counter from "./counter";
import { getPath } from "../../config/urls";
import Suspense from "../../components/suspense";
import getActiveMetrics from "../../actions/superadmin/getActiveMetrics";
import MetricCounter from "../../components/skeletons/superadmin/metricCounter";
import { createStringifiedUrl } from "../../lib/objects";

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
          <div className="request-block">
            <div className="dashboard-header">
              <div className="dashboard-header-inner">
                <h3>Supervision requests</h3>
                <button className="button">View all</button>
              </div>
            </div>
            <div className="request-card-list">
              <div className="request-card-list-card-item">
                <div className="request-card-list-card-item-inner">
                  <div className="request-card-list-card-header">
                    <span className="custom-tag">Pending</span>
                    <div className="interpunct" />
                    <span>9 hours ago</span>
                  </div>
                  <h5>5,000</h5>
                  <p>To Jonathan Sherman</p>
                </div>
                <img src="/images/caret-forward.svg" alt="" />
              </div>
              <div className="request-card-list-card-item">
                <div className="request-card-list-card-item-inner">
                  <div className="request-card-list-card-header">
                    <span className="custom-tag">Pending</span>
                    <div className="interpunct" />
                    <span>9 hours ago</span>
                  </div>
                  <h5>5,000</h5>
                  <p>To Jonathan Sherman</p>
                </div>
                <img src="/images/caret-forward.svg" alt="" />
              </div>
              <div className="request-card-list-card-item">
                <div className="request-card-list-card-item-inner">
                  <div className="request-card-list-card-header">
                    <span className="custom-tag">Pending</span>
                    <div className="interpunct" />
                    <span>9 hours ago</span>
                  </div>
                  <h5>5,000</h5>
                  <p>To Jonathan Sherman</p>
                </div>
                <img src="/images/caret-forward.svg" alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="list-section">
        <div className="container">
          <div className="list-section-left">
            <div className="dashboard-header">
              <div className="dashboard-header-inner">
                <h3>Students</h3>
                <button className="button">View all</button>
              </div>
            </div>
            <div className="list-section-list">
              <div className="list-section-list-card-item">
                <div className="list-section-list-card-item-inner">
                  <div className="list-section-list-card-initials-wrapper">
                    JD
                  </div>
                  <div>
                    <h6>John Doe</h6>
                    <p>Computing</p>
                  </div>
                </div>
                <img src="/images/caret-forward.svg" alt="" />
              </div>
              <div className="list-section-list-card-item">
                <div className="list-section-list-card-item-inner">
                  <div className="list-section-list-card-initials-wrapper">
                    JD
                  </div>
                  <div>
                    <h6>John Doe</h6>
                    <p>Computing</p>
                  </div>
                </div>
                <img src="/images/caret-forward.svg" alt="" />
              </div>
              <div className="list-section-list-card-item">
                <div className="list-section-list-card-item-inner">
                  <div className="list-section-list-card-initials-wrapper">
                    JD
                  </div>
                  <div>
                    <h6>John Doe</h6>
                    <p>Computing</p>
                  </div>
                </div>
                <img src="/images/caret-forward.svg" alt="" />
              </div>
            </div>
          </div>
          <div className="list-section-right">
            <div className="dashboard-header">
              <div className="dashboard-header-inner">
                <h3>Supervisors</h3>
                <button className="button">View all</button>
              </div>
            </div>
            <div className="list-section-list">
              <div className="list-section-list-card-item">
                <div className="list-section-list-card-item-inner">
                  <div className="list-section-list-card-initials-wrapper">
                    JD
                  </div>
                  <div>
                    <h6>John Doe</h6>
                    <p>Computing</p>
                  </div>
                </div>
                <img src="/images/caret-forward.svg" alt="" />
              </div>
              <div className="list-section-list-card-item">
                <div className="list-section-list-card-item-inner">
                  <div className="list-section-list-card-initials-wrapper">
                    JD
                  </div>
                  <div>
                    <h6>John Doe</h6>
                    <p>Computing</p>
                  </div>
                </div>
                <img src="/images/caret-forward.svg" alt="" />
              </div>
              <div className="list-section-list-card-item">
                <div className="list-section-list-card-item-inner">
                  <div className="list-section-list-card-initials-wrapper">
                    JD
                  </div>
                  <div>
                    <h6>John Doe</h6>
                    <p>Computing</p>
                  </div>
                </div>
                <img src="/images/caret-forward.svg" alt="" />
              </div>
            </div>
          </div>
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
