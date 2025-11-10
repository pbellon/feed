import {
  FeedEventStatus,
  FeedEventSubject,
  FeedSortableColumn,
  SortOrder,
} from "@feed/types";

import { ReadonlyURLSearchParams } from "next/navigation";
import { FeedContextState } from "./types";
import { parseLocalDate } from "@/lib/date";

function parseDate(param: string | null): string | undefined {
  if (param === null) {
    return undefined;
  }
  const date = parseLocalDate(param);
  if (date) {
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

function parsePositiveInt(
  param: string | null,
  max?: number
): number | undefined {
  if (param && typeof param === "string") {
    const nb = parseInt(param, 10);
    if (!isNaN(nb) && nb >= 0) {
      if (max && nb > max) return max;
    }
    return nb;
  }
  return undefined;
}

function parseSortColumn(param: string | null): FeedSortableColumn | undefined {
  if (
    param &&
    Object.values(FeedSortableColumn).includes(param as FeedSortableColumn)
  ) {
    return param as FeedSortableColumn;
  }

  return undefined;
}

function parseSortOrder(param: string | null): SortOrder | undefined {
  if (param && Object.values(SortOrder).includes(param as SortOrder)) {
    return param as SortOrder;
  }

  return undefined;
}

export function parseEventSearchParams(
  params: ReadonlyURLSearchParams
): FeedContextState {
  const startDate = parseDate(params.get("startDate"));
  const endDate = parseDate(params.get("endDate"));
  const status = parseEventStatus(params.get("status"));
  const subject = parseEventSubject(params.get("subject"));
  const page = parsePositiveInt(params.get("page"));
  const pageSize = parsePositiveInt(params.get("pageSize"), 25);
  const sortColumn = parseSortColumn(params.get("sortBy"));
  const sortOrder = parseSortOrder(params.get("sortOrder"));

  return {
    sort:
      sortColumn && sortOrder
        ? {
            column: sortColumn,
            order: sortOrder,
          }
        : {
            column: FeedSortableColumn.CREATED_AT,
            order: SortOrder.DESCENDING,
          },
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
