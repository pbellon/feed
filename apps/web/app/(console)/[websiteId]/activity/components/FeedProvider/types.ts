import { FeedEventStatus, FeedEventType } from "@feed/types";

export type FeedProviderFilters = {
  type: FeedEventType | "";
  status: FeedEventStatus | "";
  startDate: string | "";
  endDate: string | "";
};

export type FeedProviderPagination = {
  page: number;
  pageSize: number;
};

export type FeedProviderState = {
  filters: FeedProviderFilters;
  pagination: FeedProviderPagination;
};

export type FeedProviderCallbacks = {
  resetFilters: () => void;

  setType: (type: FeedEventType | "") => void;
  setStatus: (status: FeedEventStatus | "") => void;

  setDateRange: (startDate: string, endDate: string) => void;

  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
};

export type FeedProviderContextState = FeedProviderState &
  FeedProviderCallbacks;

export enum FeedProviderActionKind {
  // filters related actions
  RESET_FILTERS = "RESET_FILTERS",
  SET_TYPE = "SET_TYPE",
  SET_STATUS = "SET_STATUS",
  SET_DATE_RANGE = "SET_DATE_RANGE",

  // pagination related actions
  SET_PAGE = "SET_PAGE",
  SET_PAGE_SIZE = "SET_PAGE_SIZE",
}

type ResetFiltersAction = {
  type: FeedProviderActionKind.RESET_FILTERS;
};

type SetTypeAction = {
  type: FeedProviderActionKind.SET_TYPE;
  payload: FeedEventType | "";
};

type SetStatusAction = {
  type: FeedProviderActionKind.SET_STATUS;
  payload: FeedEventStatus | "";
};

type SetDateRangeAction = {
  type: FeedProviderActionKind.SET_DATE_RANGE;
  payload: {
    start?: string;
    end?: string;
  };
};

type SetPageAction = {
  type: FeedProviderActionKind.SET_PAGE;
  payload: number;
};

type SetPageSizeAction = {
  type: FeedProviderActionKind.SET_PAGE_SIZE;
  payload: number;
};

export type FeedProviderAction =
  | ResetFiltersAction
  | SetTypeAction
  | SetStatusAction
  | SetDateRangeAction
  | SetPageAction
  | SetPageSizeAction;
