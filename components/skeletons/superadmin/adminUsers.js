import PropTypes from "prop-types";
import Skeleton from "react-loading-skeleton";

const AdminUsersSkeleton = ({ rows }) => {
  return (
    <>
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
            <div className="custom-table-cell">
              <button type="button" className="button">
                <Skeleton width={60} height={15} />
              </button>
              <Skeleton width={60} height={15} />
            </div>
          </div>
        ))}
    </>
  );
};

AdminUsersSkeleton.propTypes = {
  rows: PropTypes.number.isRequired,
};

export default AdminUsersSkeleton;
