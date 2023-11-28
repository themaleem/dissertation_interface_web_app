const DISSERTATION_BASE_URL =
  "https://difgatewaysolution.azurewebsites.net/api/v1";
const ACCOUNTS_BASE_URL =
  "https://difusermanagementapi.azurewebsites.net/api/v1";

const pathsByName = {
  homePath: {
    href: "/",
    metaTitle: "",
    type: "static",
    metaDescription: "",
  },
  signInPath: {
    type: "auth",
    metaTitle: "",
    metaDescription: "",
    href: "/auth/sign-in",
  },
  signUpPath: {
    type: "auth",
    metaTitle: "",
    metaDescription: "",
    href: "/auth/sign-up",
  },
  forgotPasswordPath: {
    type: "auth",
    metaTitle: "",
    metaDescription: "",
    href: "/auth/forgot-password",
  },
  confirmEmailPath: {
    type: "auth",
    metaTitle: "",
    metaDescription: "",
    href: "/auth/confirm-email",
  },
  resetPasswordPath: {
    type: "auth",
    metaTitle: "",
    metaDescription: "",
    href: "/auth/reset-password",
  },
  currentUserPath: {
    type: "auth",
    href: "/user/[id]",
    route: "/user/[id]",
  },
  adminDashboardPath: {
    type: "admin",
    metaTitle: "",
    metaDescription: "",
    href: "/admin/dashboard",
  },
  adminUsersPath: {
    metaTitle: "",
    href: "/admin/list",
    type: "superadmin",
    metaDescription: "",
    route: "/user/get-admin-users",
  },
  newAdminPath: {
    metaTitle: "",
    type: "superadmin",
    href: "/admin/new",
    metaDescription: "",
  },
  systemConfigurationPath: {
    metaTitle: "",
    type: "admin",
    metaDescription: "",
    route: "/academicyear",
    href: "/admin/system-configuration",
  },
  newAcademicYearPath: {
    metaTitle: "",
    type: "admin",
    metaDescription: "",
    route: "/academicyear",
    href: "/admin/system-configuration/new-academic-year",
  },
  newCoursePath: {
    type: "admin",
    metaTitle: "",
    metaDescription: "",
    href: "/admin/system-configuration/new-course",
  },
  newDissertationCohortsPath: {
    type: "admin",
    metaTitle: "",
    metaDescription: "",
    href: "/admin/system-configuration/new-cohort",
  },
  newDepartmentPath: {
    metaTitle: "",
    type: "admin",
    metaDescription: "",
    href: "/admin/system-configuration/new-department",
  },
  dissertationCohortsPath: {
    href: "#tab=cohorts",
    metaTitle: "",
    type: "admin",
    metaDescription: "",
    route: "/dissertationcohort",
  },
  departmentsPath: {
    href: "",
    metaTitle: "",
    type: "admin",
    metaDescription: "",
    route: "/department",
  },
  coursesPath: {
    href: "",
    type: "admin",
    metaTitle: "",
    route: "/course",
    metaDescription: "",
  },
};

const pathsByHref = Object.values(pathsByName).reduce((acc, val) => {
  acc[val.href] = val;
  return acc;
}, {});

const getPath = (pathName, params = {}) => {
  const { href, route } = pathsByName[pathName];

  let as = href;
  let apiRoute = route;

  if (params) {
    Object.keys(params).forEach((key) => {
      if (apiRoute) apiRoute = apiRoute.replace(`[${key}]`, params[key]);
      as = as.replace(`[${key}]`, params[key]);
    });
  }

  const data = { href, as };
  if (apiRoute) data.route = apiRoute;
  return data;
};

const isPathType = (href, type) => pathsByHref[href].type === type;

export { getPath, isPathType, DISSERTATION_BASE_URL, ACCOUNTS_BASE_URL };
