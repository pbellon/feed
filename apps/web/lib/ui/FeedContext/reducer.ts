import { Reducer } from "react";

import { SortOrder } from "@feed/types";

import {
  type FeedContextAction,
  FeedContextActionKind,
  type FeedContextPagination,
  type FeedContextState,
} from "./types";

function resetPage(pagination: FeedContextPagination): FeedContextPagination {
  return {
    pageSize: pagination.pageSize,
    page: 0,
  };
}

function toggleSortOrder(order: SortOrder): SortOrder {
  if (order === SortOrder.ASCENDING) {
    return SortOrder.DESCENDING;
  }

  return SortOrder.ASCENDING;
}

export const reducer: Reducer<FeedContextState, FeedContextAction> = (
  state,
  action
) => {
  switch (action.type) {
    case FeedContextActionKind.RESET_FILTERS: {
      return {
        ...state,
        pagination: resetPage(state.pagination),
        filters: {
          status: "",
          subject: "",
          startDate: "",
          endDate: "",
        },
      };
    }
    case FeedContextActionKind.SET_START_DATE: {
      return {
        ...state,
        pagination: resetPage(state.pagination),
        filters: {
          ...state.filters,
          startDate: action.payload,
        },
      };
    }
    case FeedContextActionKind.SET_END_DATE: {
      return {
        ...state,
        pagination: resetPage(state.pagination),
        filters: {
          ...state.filters,
          endDate: action.payload,
        },
      };
    }
    case FeedContextActionKind.SET_STATUS: {
      return {
        ...state,
        pagination: resetPage(state.pagination),
        filters: {
          ...state.filters,
          status: action.payload,
        },
      };
    }
    case FeedContextActionKind.SET_SUBJECT: {
      return {
        ...state,
        pagination: resetPage(state.pagination),
        filters: {
          ...state.filters,
          subject: action.payload,
        },
      };
    }
    case FeedContextActionKind.SET_PAGE: {
      return {
        ...state,
        pagination: {
          ...state.pagination,
          page: action.payload,
        },
      };
    }
    case FeedContextActionKind.SET_PAGE_SIZE: {
      return {
        ...state,
        pagination: {
          page: 0,
          pageSize: action.payload,
        },
      };
    }
    case FeedContextActionKind.SORT_BY_COLUMN: {
      const nextOrder =
        state.sort.column == action.payload
          ? toggleSortOrder(state.sort.order)
          : SortOrder.ASCENDING;
      return {
        ...state,
        sort: {
          column: action.payload,
          order: nextOrder,
        },
      };
    }
    case FeedContextActionKind.UPDATE_STATE: {
      return action.payload;
    }
  }
};
