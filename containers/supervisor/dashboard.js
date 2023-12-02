import PropTypes from "prop-types";

import ImageComponent from "../../components/image";
import PicImage from "../../public/images/pic.png";
import PeopleImage from "../../public/images/people.svg";
import FileIcon from "../../public/images/basil_file-solid.svg";
import CaretForwardImage from "../../public/images/caret-forward.svg";

const SupervisorDashboard = ({ auth }) => {
  return (
    <>
      <section className="request-section has-top">
        <div className="section-wrapper">
          <div className="container">
            <div className="request-block">
              <div className="dashboard-header">
                <div className="dashboard-header-inner">
                  <h3>Pending requests</h3>
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
                    <h5>John Doe</h5>
                    <p>Computing</p>
                    <div className="btn-group">
                      <button className="button">Approve</button>
                      <button className="button">Decline</button>
                    </div>
                  </div>
                </div>
                <div className="request-card-list-card-item">
                  <div className="request-card-list-card-item-inner">
                    <div className="request-card-list-card-header">
                      <span className="custom-tag">Pending</span>
                      <div className="interpunct" />
                      <span>9 hours ago</span>
                    </div>
                    <h5>John Doe</h5>
                    <p>Computing</p>
                    <div className="btn-group">
                      <button className="button">Approve</button>
                      <button className="button">Decline</button>
                    </div>
                  </div>
                  <ImageComponent src={CaretForwardImage} alt="Previous" />
                </div>
                <div className="request-card-list-card-item">
                  <div className="request-card-list-card-item-inner">
                    <div className="request-card-list-card-header">
                      <span className="custom-tag">Pending</span>
                      <div className="interpunct" />
                      <span>9 hours ago</span>
                    </div>
                    <h5>John Doe</h5>
                    <p>Computing</p>
                    <div className="btn-group">
                      <button className="button">Approve</button>
                      <button className="button">Decline</button>
                    </div>
                  </div>
                  <ImageComponent src={CaretForwardImage} alt="Previous" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="list-section">
        <div className="section-wrapper">
          <div className="container">
            <div className="list-section-left">
              <div className="list-section-list no-header">
                <div className="list-section-list-card-item aligned-tp">
                  <div className="list-section-list-card-item-inner">
                    <div className="list-section-list-card-initials-wrapper">
                      <ImageComponent src={PicImage} alt="picture" />
                    </div>
                    <div>
                      <h6>John Doe</h6>
                      <p className="sub">johndoe@sheffielduniversity.co.uk</p>
                      <p className="sm">Computing</p>
                    </div>
                  </div>
                  <button className="button">Edit</button>
                </div>
                <div className="list-section-list-card-item aligned-tp">
                  <div className="list-section-list-card-item-inner">
                    <div className="list-section-list-card-initials-wrapper blu-bg">
                      <ImageComponent src={FileIcon} alt="file" />
                    </div>
                    <div>
                      <h6>Research topic</h6>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Aliquam gravida libero ac laoreet vehicula. Sed tortor
                        nunc, mattis vitae ante quis, dignissim lobortis arcu.
                        Integer sed arcu vel libero convallis semper. Aliquam
                        vehicula efficitur accumsan.
                      </p>
                    </div>
                  </div>
                  <button className="button">Edit</button>
                </div>
                <div className="list-section-list-card-item aligned-tp">
                  <div className="list-section-list-card-item-inner">
                    <div className="list-section-list-card-initials-wrapper is-grey">
                      <ImageComponent src={PeopleImage} alt="people" />
                    </div>
                    <div>
                      <h6>Supervision slot</h6>
                      <p className="lg">26</p>
                    </div>
                  </div>
                  <button className="button">Upload</button>
                </div>
              </div>
            </div>
            <div className="list-section-right">
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
                  <button className="button">Request</button>
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
                  <button className="button">Request</button>
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
                  <button className="button">Request</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

SupervisorDashboard.propTypes = {
  auth: PropTypes.instanceOf(Object).isRequired,
};

export default SupervisorDashboard;
