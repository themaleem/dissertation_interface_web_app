import Skeleton from "react-loading-skeleton";

const SupervisorList = () => {
  return (
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
  );
};

export default SupervisorList;
