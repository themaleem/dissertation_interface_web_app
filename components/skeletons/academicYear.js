import PropTypes from "prop-types";
import Skeleton from "react-loading-skeleton";

const AcademicYearSkeleton = ({ rows }) => {
  return (
    <>
      <div className="custom-table acayr">
        <div className="custom-table-row header">
          <div className="custom-table-cell">
            <span>
              <Skeleton width={60} height={15} />
            </span>
          </div>
          <div className="custom-table-cell">
            <span>
              <Skeleton width={60} height={15} />
            </span>
          </div>
          <div className="custom-table-cell">
            <span>
              <Skeleton width={60} height={15} />
            </span>
          </div>
          <div className="custom-table-cell">
            <span>
              <Skeleton width={60} height={15} />
            </span>
          </div>
        </div>
        {Array(rows)
          .fill()
          .map((_, index) => (
            <div key={index} className="custom-table-row">
              <div className="custom-table-cell">
                <span title="John Doe">
                  <Skeleton width={60} height={15} />
                </span>
              </div>
              <div className="custom-table-cell">
                <span title="johndoe@sheffielduni.co">
                  <Skeleton width={60} height={15} />
                </span>
              </div>
              <div className="custom-table-cell">
                <span title="c2045353">
                  <Skeleton width={60} height={15} />
                </span>
              </div>
              <div className="custom-table-cell">
                <span>
                  <Skeleton width={60} height={15} />{" "}
                </span>
              </div>
            </div>
          ))}
      </div>
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
    </>
  );
};

AcademicYearSkeleton.propTypes = {
  rows: PropTypes.number.isRequired,
};

export default AcademicYearSkeleton;
