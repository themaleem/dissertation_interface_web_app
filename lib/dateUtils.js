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
