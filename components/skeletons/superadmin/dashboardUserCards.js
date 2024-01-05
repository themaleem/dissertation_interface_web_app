import Skeleton from "react-loading-skeleton";

const DashboardUserCards = () => {
  return (
    <div className="list-section-right">
      <div className="dashboard-header">
        <div className="dashboard-header-inner">
          <h3>
            <Skeleton width={150} height={35} />
          </h3>
          <Skeleton width={60} height={35} />
        </div>
      </div>
      <div className="list-section-list">
        <div className="list-section-list-card-item">
          <div className="list-section-list-card-item-inner">
            <Skeleton circle width={50} height={50} />
            <div>
              <h6>
                <Skeleton width={120} height={25} />
              </h6>
              <p>
                <Skeleton width={90} height={25} />
              </p>
            </div>
          </div>
          <Skeleton width={15} height={15} />
        </div>
        <div className="list-section-list-card-item">
          <div className="list-section-list-card-item-inner">
            <Skeleton circle width={50} height={50} />
            <div>
              <h6>
                <Skeleton width={120} height={25} />
              </h6>
              <p>
                <Skeleton width={90} height={25} />
              </p>
            </div>
          </div>
          <Skeleton width={15} height={15} />
        </div>
        <div className="list-section-list-card-item">
          <div className="list-section-list-card-item-inner">
            <Skeleton circle width={50} height={50} />
            <div>
              <h6>
                <Skeleton width={120} height={25} />
              </h6>
              <p>
                <Skeleton width={90} height={25} />
              </p>
            </div>
          </div>
          <Skeleton width={15} height={15} />
        </div>
      </div>
    </div>
  );
};

export default DashboardUserCards;
