import PropTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";

import CustomTabs from "../../../components/customTabs";
import authWrapper from "../../../containers/hoc/authWrapper";
import DashboardLayout from "../../../components/layout/dashboard";
import Cohorts from "../../../containers/superadmin/admins/cohorts";
import Courses from "../../../containers/superadmin/admins/courses";
import Departments from "../../../containers/superadmin/admins/departments";
import SystemConfiguration from "../../../containers/superadmin/admins/systemConfiguration";

const tabsObject = {
  "academic-year": 0,
  cohorts: 1,
  departments: 2,
  courses: 3,
};

const AcademicYearPage = ({ auth }) => {
  const getTabs = useCallback(() => {
    return [
      {
        tabIndex: 0,
        disabled: false,
        title: "Academic Year",
        panel: <SystemConfiguration auth={auth} />,
      },
      {
        tabIndex: 1,
        disabled: false,
        title: "Dissertation Cohorts",
        panel: <Cohorts auth={auth} />,
      },

      {
        tabIndex: 2,
        disabled: false,
        title: "Departments",
        panel: <Departments auth={auth} />,
      },
      {
        tabIndex: 3,
        disabled: false,
        title: "Courses",
        panel: <Courses auth={auth} />,
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
        pathName="systemConfigurationPath"
      />
    </DashboardLayout>
  );
};

AcademicYearPage.propTypes = {
  auth: PropTypes.instanceOf(Object).isRequired,
};

export default authWrapper(AcademicYearPage);
