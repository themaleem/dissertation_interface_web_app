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
  confirmSupervisorInvite: {
    type: "auth",
    href: "/auth/supervisor/confirm-invite",
  },
  // supervisorregisterPath: {
  //   type: "auth",
  //   href: "/user/[id]",
  //   route: "/user/[id]",
  // },
  adminDashboardPath: {
    type: "admin",
    metaTitle: "",
    metaDescription: "",
    href: "/admin/dashboard",
  },
  adminUsersPath: {
    metaTitle: "",
    type: "superadmin",
    metaDescription: "",
    href: "/admin/manage-admins",
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
  activeDepartmentsPath: {
    href: "",
    metaTitle: "",
    type: "admin",
    metaDescription: "",
    route: "/department/active",
  },
  activeCoursesPath: {
    href: "",
    metaTitle: "",
    type: "admin",
    metaDescription: "",
    route: "/course/active",
  },
  coursesPath: {
    href: "",
    type: "admin",
    metaTitle: "",
    route: "/course",
    metaDescription: "",
  },

  studentsPath: {
    type: "admin",
    metaTitle: "",
    metaDescription: "",
    href: "/students",
  },
  studentInvitesPath: {
    type: "admin",
    metaTitle: "",
    metaDescription: "",
    href: "/studentinvite",
  },
  inviteStudentPath: {
    type: "admin",
    metaTitle: "",
    metaDescription: "",
    route: "/students",
    href: "/students/invite",
  },
  studentDashboardPath: {
    metaTitle: "",
    type: "student",
    metaDescription: "",
    href: "/student/dashboard",
  },
  supervisorsPath: {
    type: "admin",
    metaTitle: "",
    metaDescription: "",
    href: "/supervisors",
  },
  supervisorInvitesPath: {
    type: "admin",
    metaTitle: "",
    metaDescription: "",
    href: "/supervisorinvite",
  },
  inviteSupervisorPath: {
    type: "admin",
    metaTitle: "",
    metaDescription: "",
    route: "/supervisors",
    href: "/supervisors/invite",
  },
  supervisorDashboardPath: {
    metaTitle: "",
    type: "supervisor",
    metaDescription: "",
    href: "/supervisor/dashboard",
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
