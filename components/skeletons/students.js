import Skeleton from "react-loading-skeleton";

import SupervisorsInvitesSkeleton from "./supervisors/invites";

const CohortStudentSkeleton = () => {
  return (
    <section className="manage-admin-section">
      <div className="section-wrapper">
        <div className="container">
          <div className="request-block">
            <div className="dashboard-header">
              <div className="dashboard-header-inner">
                <h3>Students</h3>

                <div className="btn-group">
                  <Skeleton width={60} height={15} />
                  <Skeleton width={60} height={15} />
                </div>
              </div>
            </div>
            <div className="search-block is-flex is-align-items-flex-end is-justify-content-space-between">
              <div className="field">
                <p className="control has-icons-left no-label no-bts">
                  <Skeleton width={60} height={15} />
                </p>
              </div>
            </div>
          </div>
          <div className="custom-table-wrapper">
            <SupervisorsInvitesSkeleton />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CohortStudentSkeleton;
