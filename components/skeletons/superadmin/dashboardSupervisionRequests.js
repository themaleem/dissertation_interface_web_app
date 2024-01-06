import Skeleton from "react-loading-skeleton";

const DashboardSupervisionRequests = () => {
  return (
    <div className="request-card-list">
      <div className="request-card-list-card-item">
        <div className="request-card-list-card-item-inner">
          <div className="request-card-list-card-header">
            <span className="custom-tag">
              <Skeleton width={60} height={15} />
            </span>
            <div className="interpunct" />
            <span>
              <Skeleton width={60} height={15} />
            </span>
          </div>
          <h5>
            <Skeleton width={150} height={25} />
          </h5>
          <p>
            <Skeleton width={100} height={15} />
          </p>
        </div>
        <Skeleton width={15} height={15} />
      </div>
      <div className="request-card-list-card-item">
        <div className="request-card-list-card-item-inner">
          <div className="request-card-list-card-header">
            <span className="custom-tag">
              <Skeleton width={60} height={15} />
            </span>
            <div className="interpunct" />
            <span>
              <Skeleton width={60} height={15} />
            </span>
          </div>
          <h5>
            <Skeleton width={150} height={25} />
          </h5>
          <p>
            <Skeleton width={100} height={15} />
          </p>
        </div>
        <Skeleton width={15} height={15} />
      </div>
      <div className="request-card-list-card-item">
        <div className="request-card-list-card-item-inner">
          <div className="request-card-list-card-header">
            <span className="custom-tag">
              <Skeleton width={60} height={15} />
            </span>
            <div className="interpunct" />
            <span>
              <Skeleton width={60} height={15} />
            </span>
          </div>
          <h5>
            <Skeleton width={150} height={25} />
          </h5>
          <p>
            <Skeleton width={100} height={15} />
          </p>
        </div>
        <Skeleton width={15} height={15} />
      </div>
    </div>
  );
};

export default DashboardSupervisionRequests;
