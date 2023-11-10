import Skeleton from "react-loading-skeleton";

const PaginationSkeleton = () => {
  return (
    <div className="table-pagination is-flex is-align-items-center is-justify-content-space-between">
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
  );
};

export default PaginationSkeleton;
