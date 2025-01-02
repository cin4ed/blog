/**
 * Formats a given Date object into a Spanish locale date string.
 *
 * @param {Date} date - The date to be formatted.
 * @returns {string} - The formatted date string in Spanish locale.
 *
 * The returned string includes the full weekday name, numeric year,
 * full month name, and numeric day.
 *
 * Example:
 * const date = new Date('2023-10-05');
 * console.log(getSpanishDate(date)); // "jueves, 5 de octubre de 2023"
 */

export function getSpanishDate(date: Date): string {
  return date.toLocaleDateString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Formats a given Date object into an English locale date string.
 *
 * @param {Date} date - The date to be formatted.
 * @returns {string} - The formatted date string in English locale.
 *
 * The returned string includes the full weekday name, numeric year,
 * full month name, and numeric day.
 *
 * Example:
 * const date = new Date('2023-10-05');
 * console.log(getEnglishDate(date)); // "Thursday, October 5, 2023"
 */

export function getEnglishDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
