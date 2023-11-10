import Skeleton from "react-loading-skeleton";

const AdminUserSkeleton = () => {
  return (
    <form>
      <div className="mb-4">
        <label htmlFor="email" className="form-label">
          Email address *
        </label>
        <div className="input-group input-group-lg d-flex align-items-center">
          <Skeleton width={500} height={40} />
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="firstName" className="form-label">
          First Name *
        </label>
        <div className="input-group input-group-lg d-flex align-items-center">
          <Skeleton
            width={500}
            height={40}
            className="form-control border-0 bg-light rounded-end ps-1"
          />
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="lastName" className="form-label">
          Last Name *
        </label>
        <div className="input-group input-group-lg d-flex align-items-center">
          <Skeleton
            width={500}
            height={40}
            className="form-control border-0 bg-light rounded-end ps-1"
          />
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="lastName" className="form-label">
          Staff ID *
        </label>
        <div className="input-group input-group-lg d-flex align-items-center">
          <Skeleton
            width={500}
            height={40}
            className="form-control border-0 bg-light rounded-end ps-1"
          />
        </div>
      </div>
      <div className="align-items-center mt-0">
        <div className="d-grid">
          <Skeleton width={500} height={40} className="btn btn-primary mb-0" />
        </div>
      </div>
    </form>
  );
};

export default AdminUserSkeleton;
