import PropTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";

import CustomTabs from "../../components/customTabs";
import authWrapper from "../../containers/hoc/authWrapper";
import DashboardLayout from "../../components/layout/dashboard";
import SupervisorRequestsList from "../../containers/supervisionRequest";

const path = "supervisorSupervisionRequestsPath";

const tabsObject = {
  pending: 0,
  approved: 1,
  rejected: 2,
};

const SupervisionRequestsPage = ({ auth }) => {
  const getTabs = useCallback(() => {
    return [
      {
        tabIndex: 0,
        disabled: false,
        title: "Pending",
        panel: (
          <SupervisorRequestsList auth={auth} status="pending" path={path} />
        ),
      },
      {
        tabIndex: 1,
        disabled: false,
        title: "Approved",
        panel: (
          <SupervisorRequestsList auth={auth} status="approved" path={path} />
        ),
      },
      {
        tabIndex: 2,
        disabled: false,
        title: "Rejected",
        panel: (
          <SupervisorRequestsList auth={auth} status="rejected" path={path} />
        ),
      },
    ];
  }, [auth]);

  const [tabs, setTabs] = useState(() => getTabs());

  useEffect(() => {
    setTabs(getTabs);
  }, [getTabs]);

  return (
    <DashboardLayout>
      <CustomTabs
        tabs={tabs}
        tabsObject={tabsObject}
        pathName="supervisorSupervisionRequestsPath"
      />
    </DashboardLayout>
  );
};

SupervisionRequestsPage.propTypes = {
  auth: PropTypes.instanceOf(Object).isRequired,
};

export default authWrapper(SupervisionRequestsPage);
