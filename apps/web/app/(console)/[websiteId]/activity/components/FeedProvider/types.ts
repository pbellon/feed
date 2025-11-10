import { FeedEventStatus, FeedEventSubject } from "@feed/types";

export type FeedProviderFilters = {
  subject: FeedEventSubject | "";
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

export type FeedProviderStateAndDerivated = FeedProviderState & {
  hasFilters: boolean;
};

export type FeedProviderCallbacks = {
  resetFilters: () => void;

  setStatus: (status: FeedEventStatus | "") => void;
  setSubject: (subject: FeedEventSubject | "") => void;

  setStartDate: (start: string | "") => void;
  setEndDate: (end: string | "") => void;

  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
};

export type FeedProviderContextState = FeedProviderStateAndDerivated &
  FeedProviderCallbacks;

export enum FeedProviderActionKind {
  // filters related actions
  RESET_FILTERS = "RESET_FILTERS",
  SET_SUBJECT = "SET_SUBJECT",
  SET_STATUS = "SET_STATUS",
  SET_START_DATE = "SET_START_DATE",
  SET_END_DATE = "SET_END_DATE",

  // pagination related actions
  SET_PAGE = "SET_PAGE",
  SET_PAGE_SIZE = "SET_PAGE_SIZE",

  // transversal update
  UPDATE_STATE = "UPDATE_STATE",
}

// Filter actions types
type ResetFiltersAction = {
  type: FeedProviderActionKind.RESET_FILTERS;
};

type SetSubjectAction = {
  type: FeedProviderActionKind.SET_SUBJECT;
  payload: FeedEventSubject | "";
};

type SetStatusAction = {
  type: FeedProviderActionKind.SET_STATUS;
  payload: FeedEventStatus | "";
};

type SetStartDateAction = {
  type: FeedProviderActionKind.SET_START_DATE;
  payload: string | "";
};

type SetEndDateAction = {
  type: FeedProviderActionKind.SET_END_DATE;
  payload: string | "";
};

// Pagination actions types
type SetPageAction = {
  type: FeedProviderActionKind.SET_PAGE;
  payload: number;
};

type SetPageSizeAction = {
  type: FeedProviderActionKind.SET_PAGE_SIZE;
  payload: number;
};

type UpdateStateAction = {
  type: FeedProviderActionKind.UPDATE_STATE;
  payload: FeedProviderState;
};

export type FeedProviderAction =
  | ResetFiltersAction
  | SetSubjectAction
  | SetStatusAction
  | SetStartDateAction
  | SetEndDateAction
  | SetPageAction
  | SetPageSizeAction
  | UpdateStateAction;
