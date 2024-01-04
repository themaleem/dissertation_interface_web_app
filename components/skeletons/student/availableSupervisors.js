import Skeleton from "react-loading-skeleton";

const AvailableSupervisorsSkeleton = () => {
  return (
    <>
      <div className="request-card-list has-tp">
        {Array(12)
          .fill()
          .map((_, index) => (
            <div key={index} className="request-card-list-card-item">
              <div className="request-card-list-card-item-inner">
                <h5>
                  <Skeleton width={150} height={25} />
                </h5>
                <p>
                  <Skeleton width={120} height={25} />
                </p>
                <a href="" className="request-card-link">
                  <Skeleton width={70} height={15} />
                </a>
              </div>
            </div>
          ))}
      </div>
      <div className="table-pagination ext-one is-flex is-align-items-center is-justify-content-space-between">
        <p>
          <Skeleton width={80} height={15} />
        </p>
        <div className="pagination-btn-wrapper is-flex is-align-items-center">
          <button type="button" className="button is-active">
            <Skeleton width={20} height={15} />
          </button>
          <button type="button" className="button">
            <Skeleton width={20} height={15} />
          </button>
          <button type="button" className="button">
            <Skeleton width={20} height={15} />
          </button>
          <button type="button" className="button">
            <Skeleton width={20} height={15} />
          </button>
        </div>
      </div>
    </>
  );
};

export default AvailableSupervisorsSkeleton;
