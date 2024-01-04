import Skeleton from "react-loading-skeleton";

const StudentRequestsSkeleton = () => {
  return (
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
  );
};

export default StudentRequestsSkeleton;
