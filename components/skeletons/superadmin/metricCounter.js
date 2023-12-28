import Skeleton from "react-loading-skeleton";

const MetricCounter = () => {
  return (
    <>
      <div className="overview-card-list-item">
        <h4>
          <Skeleton width={60} height={25} />
        </h4>
        <p>Students</p>
      </div>
      <div className="overview-card-list-item">
        <h4>
          <Skeleton width={60} height={25} />
        </h4>
        <p>Supervisors</p>
      </div>
      <div className="overview-card-list-item is-success">
        <h4>
          <Skeleton width={60} height={25} />
        </h4>
        <p>Approved</p>
      </div>
      <div className="overview-card-list-item is-danger">
        <h4>
          <Skeleton width={60} height={25} />
        </h4>
        <p>Declined</p>
      </div>
    </>
  );
};

export default MetricCounter;
