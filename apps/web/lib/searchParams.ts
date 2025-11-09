import {
  FeedEventsQuery,
  FeedEventStatus,
  FeedEventSubject,
} from "@feed/types";

import { ReadonlyURLSearchParams } from "next/navigation";

function parseString(param: string | null): string | undefined {
  if (param) {
    return param;
  }
  return undefined;
}

function parseEventStatus(param: string | null): FeedEventStatus | undefined {
  const upper = param?.toUpperCase();
  if (upper && upper in FeedEventStatus) {
    return upper as FeedEventStatus;
  }
  return undefined;
}

function parseEventSubject(param: string | null): FeedEventSubject | undefined {
  const upper = param?.toUpperCase();
  if (upper && upper in FeedEventSubject) {
    return upper as FeedEventSubject;
  }
  return undefined;
}

function parsePositiveInt(param: string | null): number | undefined {
  if (param && typeof param === "string") {
    const nb = parseInt(param, 10);
    if (!isNaN(nb) && nb >= 0) {
      return nb;
    }
  }
  return undefined;
}

export function parseEventSearchParams(
  params: ReadonlyURLSearchParams
): FeedEventsQuery {
  const query: FeedEventsQuery = {};

  query.startDate = parseString(params.get("startDate"));
  query.endDate = parseString(params.get("endDate"));
  query.status = parseEventStatus(params.get("status"));
  query.subject = parseEventSubject(params.get("subject"));
  query.page = parsePositiveInt(params.get("page"));
  query.pageSize = parsePositiveInt(params.get("pageSize"));

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
