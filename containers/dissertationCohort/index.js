import useSWR from "swr";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useCallback, useEffect, useState } from "react";

import CohortStudent from "./cohortStudent";
import { getPath } from "../../config/urls";
import Suspense from "../../components/suspense";
import CohortSupervisors from "./cohortSupervisors";
import CustomTabs from "../../components/customTabs";
import { createStringifiedUrl } from "../../lib/objects";
import CohortStudentSkeleton from "../../components/skeletons/students";
import getActiveCohort from "../../actions/systemConfig/cohort/getActiveCohort";

const tabsObject = { supervisors: 0, students: 1 };

const DissertationCohort = ({ auth, getActiveCohort }) => {
  const activeCohortUrl = createStringifiedUrl(
    getPath("activeDissertationCohortPath").route,
  );

  const { data: activeCohortData } = useSWR(activeCohortUrl, getActiveCohort);

  const renderCohortStudent = useCallback(
    (cohortId) => {
      return <CohortStudent cohortId={cohortId} auth={auth} />;
    },
    [auth],
  );

  const renderCohortStudentSkeleton = () => <CohortStudentSkeleton />;

  const getTabs = useCallback(() => {
    return [
      {
        tabIndex: 0,
        disabled: false,
        title: "Supervisors",
        panel: <CohortSupervisors auth={auth} />,
      },
      {
        tabIndex: 1,
        disabled: false,
        title: "Students",
        panel: (
          <Suspense
            hasData
            auth={auth}
            data={
              activeCohortData?.isSuccess
                ? activeCohortData?.result?.id
                : undefined
            }
            component={renderCohortStudent}
            skeleton={renderCohortStudentSkeleton}
          />
        ),
      },
    ];
  }, [activeCohortData, auth, renderCohortStudent]);

  const [tabs, setTabs] = useState(() => getTabs());

  useEffect(() => {
    setTabs(getTabs);
  }, [getTabs]);

  return (
    <CustomTabs
      tabs={tabs}
      tabsObject={tabsObject}
      pathName="activeDissertationCohortPath"
    />
  );
};

DissertationCohort.propTypes = {
  getActiveCohort: PropTypes.func.isRequired,
  auth: PropTypes.instanceOf(Object).isRequired,
};

export default connect(null, { getActiveCohort })(DissertationCohort);
