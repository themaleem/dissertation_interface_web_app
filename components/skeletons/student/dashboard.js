import Skeleton from "react-loading-skeleton";

import ImageComponent from "../../image";
import FileIcon from "../../../public/images/basil_file-solid.svg";
import FileIconRed from "../../../public/images/basil_file-solid-red.svg";

const StudentDashboardSkeleton = () => {
  return (
    <>
      <section className="request-section has-top">
        <div className="section-wrapper">
          <div className="container">
            <div className="request-block">
              <div className="dashboard-header">
                <div className="dashboard-header-inner">
                  <h3>Supervision requests</h3>

                  <div className="btn-group">
                    <Skeleton width={60} height={25} />
                  </div>
                </div>
              </div>
              <div className="request-card-list">
                <div className="request-card-list-card-item">
                  <div className="request-card-list-card-item-inner">
                    <div className="request-card-list-card-header">
                      <span className="custom-tag green">
                        <Skeleton width={60} height={25} />
                      </span>

                      <div className="interpunct" />
                      <span>
                        <Skeleton width={120} height={15} />
                      </span>
                    </div>
                    <h5>
                      <Skeleton width={160} height={35} />
                    </h5>
                    <p>
                      <Skeleton width={60} height={15} />
                    </p>
                    <div className="btn-group">
                      <Skeleton width={60} height={25} />
                    </div>
                  </div>
                </div>
                <div className="request-card-list-card-item">
                  <div className="request-card-list-card-item-inner">
                    <div className="request-card-list-card-header">
                      <span className="custom-tag">
                        <Skeleton width={60} height={25} />
                      </span>

                      <div className="interpunct" />
                      <span>
                        <Skeleton width={120} height={15} />
                      </span>
                    </div>
                    <h5>
                      <Skeleton width={160} height={35} />
                    </h5>
                    <p>
                      <Skeleton width={60} height={15} />
                    </p>
                    <div className="btn-group">
                      <Skeleton width={60} height={25} />
                    </div>
                  </div>
                </div>
                <div className="request-card-list-card-item">
                  <div className="request-card-list-card-item-inner">
                    <div className="request-card-list-card-header">
                      <span className="custom-tag">
                        <Skeleton width={60} height={25} />
                      </span>

                      <div className="interpunct" />
                      <span>
                        <Skeleton width={120} height={15} />
                      </span>
                    </div>
                    <h5>
                      <Skeleton width={160} height={35} />
                    </h5>
                    <p>
                      <Skeleton width={60} height={15} />
                    </p>
                    <div className="btn-group">
                      <Skeleton width={60} height={25} />
                    </div>
                  </div>
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
                      <Skeleton
                        circle
                        width={50}
                        height={50}
                        className="picture"
                      />
                    </div>
                    <div>
                      <h6>
                        <Skeleton width={100} height={20} />
                      </h6>
                      <p className="sub">
                        <Skeleton width={160} height={20} />
                      </p>
                      <p className="sm">
                        <Skeleton width={60} height={15} />
                      </p>
                    </div>
                  </div>
                  <div className="btn-group">
                    <Skeleton width={60} height={25} />
                  </div>
                </div>
                <div className="list-section-list-card-item aligned-tp">
                  <div className="list-section-list-card-item-inner">
                    <div className="list-section-list-card-initials-wrapper blu-bg">
                      <ImageComponent src={FileIcon} alt="file" />
                    </div>
                    <div>
                      <h6>Research topic</h6>
                      <p>
                        <Skeleton width={250} height={15} />
                        <Skeleton width={250} height={15} />
                        <Skeleton width={250} height={15} />
                        <Skeleton width={120} height={15} />
                      </p>
                    </div>
                  </div>

                  <div className="btn-group">
                    <Skeleton width={60} height={25} />
                  </div>
                </div>
                <div className="list-section-list-card-item aligned-tp">
                  <div className="list-section-list-card-item-inner">
                    <div className="list-section-list-card-initials-wrapper">
                      <ImageComponent src={FileIconRed} alt="file" />
                    </div>
                    <div>
                      <h6>Research proposal</h6>
                      <p>
                        <Skeleton width={60} height={15} />
                      </p>
                    </div>
                  </div>
                  <div className="btn-group">
                    <Skeleton width={60} height={25} />
                  </div>
                </div>
              </div>
            </div>
            <div className="list-section-right">
              <div className="dashboard-header">
                <div className="dashboard-header-inner">
                  <h3>Supervisors</h3>
                  <div className="btn-group">
                    <Skeleton width={80} height={25} />
                  </div>
                </div>
              </div>
              <div className="list-section-list">
                <div className="list-section-list-card-item">
                  <div className="list-section-list-card-item-inner">
                    <div className="list-section-list-card-initials-wrapper">
                      <Skeleton circle width={50} height={50} />
                    </div>
                    <div>
                      <h6>
                        <Skeleton width={120} height={20} />
                      </h6>
                      <p>
                        <Skeleton width={60} height={15} />
                      </p>
                    </div>
                  </div>
                  <div className="btn-group">
                    <Skeleton width={80} height={25} />
                  </div>
                </div>
                <div className="list-section-list-card-item">
                  <div className="list-section-list-card-item-inner">
                    <div className="list-section-list-card-initials-wrapper">
                      <Skeleton circle width={50} height={50} />
                    </div>
                    <div>
                      <h6>
                        <Skeleton width={120} height={20} />
                      </h6>
                      <p>
                        <Skeleton width={60} height={15} />
                      </p>
                    </div>
                  </div>
                  <div className="btn-group">
                    <Skeleton width={80} height={25} />
                  </div>
                </div>
                <div className="list-section-list-card-item">
                  <div className="list-section-list-card-item-inner">
                    <div className="list-section-list-card-initials-wrapper">
                      <Skeleton circle width={50} height={50} />
                    </div>
                    <div>
                      <h6>
                        <Skeleton width={120} height={20} />
                      </h6>
                      <p>
                        <Skeleton width={60} height={15} />
                      </p>
                    </div>
                  </div>
                  <div className="btn-group">
                    <Skeleton width={80} height={25} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default StudentDashboardSkeleton;
