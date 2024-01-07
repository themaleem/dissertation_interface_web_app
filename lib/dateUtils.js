import { format, parseISO } from "date-fns";

/**
 * Converts an ISO date string to dd/mm/yy hh:mm format.
 * @param {string} isoString - The ISO date string.
 * @returns {string} - The formatted date string.
 */
export function dateTimeWithSlashes(isoString) {
  return format(parseISO(isoString), "dd/MM/yy HH:mm");
}

/**
 * Converts an ISO date string to dd/mm/yy format.
 * @param {string} isoString - The ISO date string.
 * @returns {string} - The formatted date string.
 */
export function dateWithSlashes(isoString) {
  return format(parseISO(isoString), "dd/MM/yy");
}

/**
 * Converts an ISO date string to "18 Sept, 2023 hh:mm" format.
 * @param {string} isoString - The ISO date string.
 * @returns {string} - The formatted date string.
 */
export function dayMonthYearTimeWithSlashes(isoString) {
  return format(parseISO(isoString), "dd MMMM, yyyy HH:mm");
}

/**
 * Converts an ISO date string to "18 Sept, 2023" format.
 * @param {string} isoString - The ISO date string.
 * @returns {string} - The formatted date string.
 */
export function dayMonthYear(isoString) {
  return format(parseISO(isoString), "dd MMM, yyyy");
}

/**
 * Converts an ISO date string to "25 / January / 2024" format.
 * @param {string} isoString - The ISO date string.
 * @returns {string} - The formatted date string.
 */
export function toDayMonthYearLong(isoString) {
  return format(parseISO(isoString), "d / MMMM / yyyy");
}

export function timeAgo(dateString) {
  const givenTime = new Date(dateString);
  const currentTime = new Date();

  currentTime.setTime(currentTime.getTime() - 1000 * 60 * 60); // Subtracting one hour for testing

  const millisecondsPerMinute = 1000 * 60;
  const millisecondsPerHour = millisecondsPerMinute * 60;
  const millisecondsPerDay = millisecondsPerHour * 24;
  const millisecondsPerMonth = millisecondsPerDay * 30;
  const timeDifference = currentTime - givenTime;

  const pluralize = (value, unit) =>
    value === 1 ? `${value} ${unit} ago` : `${value} ${unit}s ago`;

  if (timeDifference < millisecondsPerMinute) {
    // @note Less than 60 seconds
    return "just now";
  }
  if (timeDifference < millisecondsPerHour) {
    // @note Less than 60 minutes
    return pluralize(
      Math.round(timeDifference / millisecondsPerMinute),
      "minute",
    );
  }

  if (timeDifference < millisecondsPerDay) {
    // @note Less than 24 hours
    return pluralize(Math.round(timeDifference / millisecondsPerHour), "hour");
  }
  if (timeDifference < millisecondsPerMonth) {
    // @note Less than 30 days
    return pluralize(Math.round(timeDifference / millisecondsPerDay), "day");
  }
  // @note More than 30 days
  return pluralize(Math.round(timeDifference / millisecondsPerMonth), "month");
}
