import { FeedEventsQuerystring } from "@feed/types";
import { RawSearchParams } from "./types";

function parseString(param: string | string[] | undefined): string | undefined {
  if (param && typeof param == "string") {
    return param;
  }
  return undefined;
}

function parsePositiveInt(
  param: string | string[] | undefined
): number | undefined {
  if (param && typeof param === "string") {
    const nb = parseInt(param, 10);
    if (!isNaN(nb) && nb >= 0) {
      return nb;
    }
  }
  return undefined;
}

export function parseEventSearchParams(
  params: RawSearchParams
): FeedEventsQuerystring {
  const query: FeedEventsQuerystring = {};

  query.startDate = parseString(params["startDate"]);
  query.endDate = parseString(params["endDate"]);
  query.page = parsePositiveInt(params["page"]);
  query.pageSize = parsePositiveInt(params["pageSize"]);

  return query;
}

export function constructSearchParams(
  rec: Record<string, string | undefined>
): string | undefined {
  const res: Record<string, string> = {};
  let entries = 0;

  Object.entries(rec).forEach(([k, v]) => {
    if (v) {
      if (typeof v === "string" && v.length > 0) {
        entries += 1;
        res[k] = v;
      }
    }
  });

  if (entries > 0) {
    return new URLSearchParams(res).toString();
  }

  return undefined;
}
