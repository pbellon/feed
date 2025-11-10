/**
 * Date conversion utilities
 */

import { parse } from "date-fns/parse";
import { formatISO } from "date-fns/formatISO";
import { format } from "date-fns/format";

// Format that will be used to store date in state & in URL for deep linking
export const LOCAL_DATE_FORMAT = "dd-MM-yyyy";

/**
 *
 * @param dateString date string in our local format date
 * @returns parsed date object or undefined if given string is "" or invalid date string
 * @see LOCAL_DATE_FORMAT
 */
export function parseLocalDate(dateString: string | ""): Date | undefined {
  if (dateString === "") return undefined;
  try {
    return parse(dateString, LOCAL_DATE_FORMAT, new Date());
  } catch (err) {
    console.error("An error occured during date parsing", err);
    return undefined;
  }
}

/**
 * Format given date to our local date format that will be used in local state
 * or in URL
 * @param date the js Date object to convert
 * @return formatted string
 * @throws can throw error if Date object is invalid
 */
export function formatLocalDate(date: Date): string {
  return format(date, LOCAL_DATE_FORMAT);
}

/**
 * Convert local front format to ISO 8601 date format (YYYY-MM-dd)
 * @see https://en.wikipedia.org/wiki/ISO_8601
 */
export function convertDateForApi(dateString: string): string | undefined {
  if (dateString === "") {
    return undefined;
  }

  const date = parseLocalDate(dateString);

  if (!date) {
    return undefined;
  }

  return formatISO(date, { representation: "date" });
}
