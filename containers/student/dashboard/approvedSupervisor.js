import PropTypes from "prop-types";

import UserCard from "../../common/userCard";
import Suspense from "../../../components/suspense";

const ApprovedSupervisor = ({ auth, data }) => {
  const cardSkeleton = () => <p>loading...</p>;

  const renderUserCard = () => {
    const { supervisorDetails } = data.result.data[0];

    return (
      <UserCard
        user={supervisorDetails}
        department={supervisorDetails.department.name}
      />
    );
  };

  return (
    <div className="list-section-right">
      <div className="dashboard-header">
        <div className="dashboard-header-inner">
          <h3>Supervisor</h3>
        </div>
      </div>
      <div className="list-section-list">
        <Suspense
          hasData
          auth={auth}
          data={data?.result}
          skeleton={cardSkeleton}
          component={renderUserCard}
        />
      </div>
    </div>
  );
};

ApprovedSupervisor.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  auth: PropTypes.instanceOf(Object).isRequired,
};

export default ApprovedSupervisor;
