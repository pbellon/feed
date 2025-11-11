import { type UseQueryResult, useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

import {
  FeedEventsQuery,
  FeedEventsReply,
  FeedEventStatus,
  FeedEventSubject,
} from "@feed/types";

import { getEvents } from "@/lib/api";
import type {
  FeedContextSort,
  FeedContextFilters,
  FeedContextPagination,
} from "@/lib/ui/FeedContext/types";

import { convertDateForApi } from "../date";

type UseFeedQueryParams = {
  websiteId: string;
  filters: FeedContextFilters;
  pagination: FeedContextPagination;
  sort: FeedContextSort;
};

const asFeedQuerystring = (
  filters: FeedContextFilters,
  pagination: FeedContextPagination,
  sort: FeedContextSort,
): FeedEventsQuery => ({
  endDate:
    filters.endDate.length > 0 ? convertDateForApi(filters.endDate) : undefined,
  startDate:
    filters.startDate.length > 0
      ? convertDateForApi(filters.startDate)
      : undefined,
  status:
    filters.status.length > 0 ? (filters.status as FeedEventStatus) : undefined,
  subject:
    filters.subject.length > 0
      ? (filters.subject as FeedEventSubject)
      : undefined,
  page: pagination.page,
  pageSize: pagination.pageSize,
  sortBy: sort.column,
  sortOrder: sort.order,
});

export function useFeedQuery(
  params: UseFeedQueryParams,
): UseQueryResult<FeedEventsReply> {
  const query = useMemo(
    (): FeedEventsQuery =>
      asFeedQuerystring(params.filters, params.pagination, params.sort),
    [params.filters, params.pagination, params.sort],
  );

  return useQuery({
    queryKey: ["websites", params.websiteId, query],
    queryFn: () => getEvents(params.websiteId, query),
    placeholderData: (data) => data,
  });
}
