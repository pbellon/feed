import { parse } from "date-fns/parse";
import { formatISO } from "date-fns/formatISO";
import { format } from "date-fns/format";

// Format that will be used to store date in state & in URL for deep linking
export const LOCAL_DATE_FORMAT = "dd-MM-yyyy";

export function parseLocalDate(dateString: string | ""): Date | undefined {
  if (dateString === "") return undefined;

  return parse(dateString, LOCAL_DATE_FORMAT, new Date());
}

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
