import Link from "next/link";
import PropTypes from "prop-types";
import { useRouter } from "next/router";

import { getPath } from "../../../config/urls";

const coursesPath = getPath("coursesPath").href;
const departmentsPath = getPath("departmentsPath").href;
const dissertationCohortsPath = getPath("dissertationCohortsPath").href;
const systemConfigurationPath = getPath("systemConfigurationPath").href;

const paths = [
  { name: "Academic year", path: systemConfigurationPath },
  { name: "Dissertation cohort", path: dissertationCohortsPath },
  { name: "Departments", path: departmentsPath },
  { name: "Courses", path: coursesPath },
];

const SystemConfigurationHeader = ({ auth }) => {
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
  auth: PropTypes.instanceOf(Object).isRequired,
};
export default SystemConfigurationHeader;
