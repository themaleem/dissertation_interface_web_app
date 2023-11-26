import Link from "next/link";
import PropTypes from "prop-types";
import { useRouter } from "next/router";

import { getPath } from "../../../config/urls";

const systemConfigurationPath = getPath("systemConfigurationPath").href;

const paths = [
  {
    name: "Academic year",
    path: `${systemConfigurationPath}#tab=academic-year`,
  },
  {
    name: "Dissertation cohort",
    path: `${systemConfigurationPath}#tab=cohorts`,
  },
  { name: "Departments", path: `${systemConfigurationPath}#tab=departments` },
  { name: "Courses", path: `${systemConfigurationPath}#tab=courses` },
];

const SystemConfigurationHeader = () => {
  const router = useRouter();

  return (
    <div className="sub-navigation">
      <div className="container">
        {paths.map((item) => {
          return (
            <Link
              key={item.name}
              href={item.path}
              className={`${router.pathname === item.path ? " is-active" : ""}`}
            >
              {item.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

SystemConfigurationHeader.propTypes = {
  systemConfig: PropTypes.bool,
};
export default SystemConfigurationHeader;
