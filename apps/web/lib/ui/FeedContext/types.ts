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

/**
 * Main state that will control the filter bar & pagination states
 */
export type FeedContextState = {
  filters: FeedProviderFilters;
  pagination: FeedProviderPagination;
};

/**
 * State derived from {@link FeedContextState} including computed attributes
 * based on main state.
 */
export type FeedContextStateAndDerived = FeedContextState & {
  hasFilters: boolean;
};

export type FeedContextCallbacks = {
  resetFilters: () => void;

  setStatus: (status: FeedEventStatus | "") => void;
  setSubject: (subject: FeedEventSubject | "") => void;

  setStartDate: (start: string | "") => void;
  setEndDate: (end: string | "") => void;

  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
};

// Full context value including state & callbacks
export type FeedContextValue = FeedContextStateAndDerived &
  FeedContextCallbacks;

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
  payload: FeedContextState;
};

export type FeedContextAction =
  | ResetFiltersAction
  | SetSubjectAction
  | SetStatusAction
  | SetStartDateAction
  | SetEndDateAction
  | SetPageAction
  | SetPageSizeAction
  | UpdateStateAction;
