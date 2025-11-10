import { FeedEventStatus, FeedEventSubject } from "@feed/types";

import { ReadonlyURLSearchParams } from "next/navigation";
import { FeedProviderState } from "./types";

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
): FeedProviderState {
  const startDate = parseString(params.get("startDate"));
  const endDate = parseString(params.get("endDate"));
  const status = parseEventStatus(params.get("status"));
  const subject = parseEventSubject(params.get("subject"));
  const page = parsePositiveInt(params.get("page"));
  const pageSize = parsePositiveInt(params.get("pageSize"));

  return {
    filters: {
      status: status ?? "",
      subject: subject ?? "",
      startDate: startDate ?? "",
      endDate: endDate ?? "",
    },
    pagination: {
      page: page ?? 0,
      pageSize: pageSize ?? 10,
    },
  };
}
