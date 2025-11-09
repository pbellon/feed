import { type UseQueryResult, useQuery } from "@tanstack/react-query";
import {
  FeedProviderFilters,
  FeedProviderPagination,
} from "../components/FeedProvider/types";
import {
  FeedEventsQuery,
  FeedEventsReply,
  FeedEventStatus,
  FeedEventSubject,
  FeedEventType,
} from "@feed/types";
import { useMemo } from "react";
import { getEvents } from "@/lib/api";

type UseFeedQueryParams = {
  websiteId: string;
  filters: FeedProviderFilters;
  pagination: FeedProviderPagination;
};

const asFeedQuerystring = (
  filters: FeedProviderFilters,
  pagination: FeedProviderPagination
): FeedEventsQuery => ({
  endDate: filters.endDate.length > 0 ? filters.endDate : undefined,
  startDate: filters.startDate.length > 0 ? filters.startDate : undefined,
  status:
    filters.status.length > 0 ? (filters.status as FeedEventStatus) : undefined,
  subject:
    filters.subject.length > 0
      ? (filters.subject as FeedEventSubject)
      : undefined,
  page: pagination.page,
  pageSize: pagination.pageSize,
});

export function useFeedQuery(
  params: UseFeedQueryParams
): UseQueryResult<FeedEventsReply> {
  const query = useMemo(
    (): FeedEventsQuery => asFeedQuerystring(params.filters, params.pagination),
    [params.filters, params.pagination]
  );

  return useQuery({
    queryKey: ["websites", params.websiteId, query],
    queryFn: () => getEvents(params.websiteId, query),
    placeholderData: (data) => data,
  });
}
