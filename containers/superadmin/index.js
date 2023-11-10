import PropTypes from "prop-types";

import Counter from "./counter";

const counterBoxItems = [
  {
    title: "Students",
    end: 1928,
  },
  {
    title: "Supervisors",
    end: 1600,
  },
  {
    title: "Approved",
    end: 1235,
    className: " is-success",
  },
  {
    title: "Declined",
    end: 845,
    className: " is-danger",
  },
];

const SuperadminDashboard = ({ auth }) => {
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
              {counterBoxItems.map((item) => (
                <div
                  key={item.title}
                  className={`overview-card-list-item${
                    item.className ? item.className : ""
                  }`}
                >
                  <Counter end={item.end} />
                  <p>{item.title}</p>
                </div>
              ))}
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
  auth: PropTypes.instanceOf(Object).isRequired,
};

export default SuperadminDashboard;
