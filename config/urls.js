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
  // adminUserPath: {
  //   type: "superadmin",
  //   route: "/superadmin/user/[id]",
  //   href: "/superadmin/admin-users/[id]",
  //   metaTitle: "",
  //   metaDescription: "",
  // },
  newAdminPath: {
    metaTitle: "",
    type: "superadmin",
    href: "/admin/new",
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

export { getPath, isPathType };
