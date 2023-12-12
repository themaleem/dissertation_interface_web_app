import Skeleton from "react-loading-skeleton";

const AvailableSupervisorsSkeleton = () => {
  return Array(12)
    .fill()
    .map((_, index) => (
      <div key={index} class="request-card-list-card-item">
        <div class="request-card-list-card-item-inner">
          <h5>
            <Skeleton width={150} height={25} />
          </h5>
          <p>
            <Skeleton width={120} height={25} />
          </p>
          <a href="" class="request-card-link">
            <Skeleton width={70} height={15} />
          </a>
        </div>
      </div>
    ));
};

export default AvailableSupervisorsSkeleton;
