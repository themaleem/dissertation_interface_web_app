import qs from "qs";

import { getPath } from "../config/urls";
import { dashboardPaths } from "../containers/hoc/authWrapper";

const createStringifiedUrl = (urlLink, params) => {
  if (!urlLink || urlLink.trim() === "") return undefined;

  // if params is not provided, is not an object, or is an empty object
  if (!params || typeof params !== "object" || Object.keys(params).length === 0)
    return urlLink;

  // If urlLink and params are provided, then stringified URL with sorted query params
  const sortedParams = Object.keys(params)
    .sort((a, b) => a.localeCompare(b))
    .reduce((acc, key) => {
      acc[key] = params[key];
      return acc;
    }, {});

  return `${urlLink}?${new URLSearchParams(sortedParams).toString()}`;
};

const doNothing = () => {};

const required = (value) => (value ? undefined : "This field is required");

const emailRegex = /\S+@\S+\.\S+/;
const emailValidator = (email) => {
  return emailRegex.test(email);
};

const validateEmail = (value) =>
  emailValidator(value) || !value ? undefined : "Enter a valid email address";

const composeValidators =
  (...validators) =>
  (value) =>
    validators.reduce(
      (error, validator) => error || validator(value),
      undefined,
    );

const allowedShuEmailDomains = [
  "shu.com", //
  "shu.ac.uk",
  "hallam.shu.ac.uk",
  "student.shu.ac.uk",
  "exchange.shu.ac.uk",
];

const validateShuEmail = (email) => {
  const domainPattern = allowedShuEmailDomains
    .map((domain) => domain.replace(".", "\\."))
    .join("|");

  const pattern = new RegExp(`@(${domainPattern})$`);
  return pattern.test(email) ? undefined : "Enter a valid SHU Email";
};

const validateStrongPassword = (password) => {
  if (!password) return "Password is required";
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
  return regex.test(password)
    ? undefined
    : "Password must be 8 characters long, contain one uppercase, one lowercase, one number and one special character.";
};

const validateConfirmationPassword = (values) => {
  const errors = {};
  if (values.password !== values.password_confirmation) {
    errors.password_confirmation = "Must match password field";
    return errors;
  }
};

const getUserInitials = (user) => {
  // @todo auth reducer initial user should be undefined
  // and then set on current_user fetch or null if user not logged in
  if (!user) return "  ";

  return `${user.firstName[0].toUpperCase()}${user.lastName[0].toUpperCase()}`;
};

const chooseRoleOrDashboardPath = (user) => {
  if (user.activeRole) {
    return dashboardPaths[user.activeRole];
  }

  const chooseRolePath = getPath("chooseRolePath").href;
  return chooseRolePath;
};

const getFragmentsFromPath = (path) => {
  const ary = path.split("#");
  return qs.parse(ary[ary.length - 1]);
};

const capitalize = (str) => {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const getTodaysDate = () => {
  const currentDate = new Date();
  let day = currentDate.getDate();
  let month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();

  day = day < 10 ? `0${day}` : day;
  month = month < 10 ? `0${month}` : month;

  return `${day}/${month}/${year}`;
};

export {
  required,
  doNothing,
  capitalize,
  getTodaysDate,
  validateEmail,
  emailValidator,
  getUserInitials,
  validateShuEmail,
  composeValidators,
  createStringifiedUrl,
  getFragmentsFromPath,
  validateStrongPassword,
  chooseRoleOrDashboardPath,
  validateConfirmationPassword,
};
