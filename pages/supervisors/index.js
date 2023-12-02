import PropTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";

import CustomTabs from "../../components/customTabs";
import authWrapper from "../../containers/hoc/authWrapper";
import SupervisorsList from "../../containers/supervisors";
import DashboardLayout from "../../components/layout/dashboard";
import SupervisorsInvitesList from "../../containers/supervisors/invites";

const tabsObject = {
  supervisors: 0,
  invites: 1,
};

const SupervisorsPage = ({ auth }) => {
  const getTabs = useCallback(() => {
    return [
      {
        tabIndex: 0,
        disabled: false,
        title: "Supervisors",
        panel: <SupervisorsList auth={auth} />,
      },
      {
        tabIndex: 1,
        disabled: false,
        title: "Pending Invites",
        panel: <SupervisorsInvitesList auth={auth} />,
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
        pathName="supervisorsPath"
      />
    </DashboardLayout>
  );
};

SupervisorsPage.propTypes = {
  auth: PropTypes.instanceOf(Object).isRequired,
};

export default authWrapper(SupervisorsPage);
