import {
  FeedEventStatus,
  FeedEventSubject,
  FeedSortableColumn,
  SortOrder,
} from "@feed/types";

export type FeedContextFilters = {
  subject: FeedEventSubject | "";
  status: FeedEventStatus | "";
  startDate: string | "";
  endDate: string | "";
};

export type FeedContextPagination = {
  page: number;
  pageSize: number;
};

export type FeedContextSort = {
  column: FeedSortableColumn;
  order: SortOrder;
};

/**
 * Main state that will control the filter bar & pagination states
 */
export type FeedContextState = {
  filters: FeedContextFilters;
  pagination: FeedContextPagination;
  sort: FeedContextSort;
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

  sortBy: (column: FeedSortableColumn) => void;
};

// Full context value including state & callbacks
export type FeedContextValue = FeedContextStateAndDerived &
  FeedContextCallbacks;

export enum FeedContextActionKind {
  // filters related actions
  RESET_FILTERS = "RESET_FILTERS",
  SET_SUBJECT = "SET_SUBJECT",
  SET_STATUS = "SET_STATUS",
  SET_START_DATE = "SET_START_DATE",
  SET_END_DATE = "SET_END_DATE",

  // pagination related actions
  SET_PAGE = "SET_PAGE",
  SET_PAGE_SIZE = "SET_PAGE_SIZE",

  // sort by column
  SORT_BY_COLUMN = "SORT_BY_COLUMN",

  // transversal update
  UPDATE_STATE = "UPDATE_STATE",
}

// Filter actions types
type ResetFiltersAction = {
  type: FeedContextActionKind.RESET_FILTERS;
};

type SetSubjectAction = {
  type: FeedContextActionKind.SET_SUBJECT;
  payload: FeedEventSubject | "";
};

type SetStatusAction = {
  type: FeedContextActionKind.SET_STATUS;
  payload: FeedEventStatus | "";
};

type SetStartDateAction = {
  type: FeedContextActionKind.SET_START_DATE;
  payload: string | "";
};

type SetEndDateAction = {
  type: FeedContextActionKind.SET_END_DATE;
  payload: string | "";
};

// Pagination actions types
type SetPageAction = {
  type: FeedContextActionKind.SET_PAGE;
  payload: number;
};

type SetPageSizeAction = {
  type: FeedContextActionKind.SET_PAGE_SIZE;
  payload: number;
};

// Sort action
type SortByColumnAction = {
  type: FeedContextActionKind.SORT_BY_COLUMN;
  payload: FeedSortableColumn;
};

type UpdateStateAction = {
  type: FeedContextActionKind.UPDATE_STATE;
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
  | SortByColumnAction
  | UpdateStateAction;
