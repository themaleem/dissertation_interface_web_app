import PropTypes from "prop-types";
import Skeleton from "react-loading-skeleton";

import { getSupervisionRequestClass } from "../../../lib/objects";

const SupervisionRequestsSkeleton = ({ status, rows }) => {
  return (
    <>
      <div className="request-card-list has-tp">
        {Array(rows)
          .fill()
          .map((_, index) => (
            <div key={index} className="request-card-list-card-item">
              <div className="request-card-list-card-item-inner">
                <div className="request-card-list-card-header">
                  <span
                    className={`custom-tag${getSupervisionRequestClass(
                      status,
                    )}`}
                  >
                    <Skeleton width={60} height={15} />
                  </span>
                  <div className="interpunct" />
                  <span>
                    <Skeleton width={60} height={15} />
                  </span>
                </div>
                <h5>
                  <Skeleton width={130} height={25} />
                </h5>
                <p>
                  <Skeleton width={110} height={15} />
                </p>
                <a className="request-card-link">
                  <Skeleton width={70} height={15} />
                </a>
              </div>
            </div>
          ))}
      </div>
      <div className="table-pagination is-flex is-align-items-center is-justify-content-space-between ext-one">
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

SupervisionRequestsSkeleton.propTypes = {
  rows: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
};

export default SupervisionRequestsSkeleton;
