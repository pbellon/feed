import { act, Reducer } from "react";
import {
  FeedProviderAction,
  FeedProviderActionKind,
  FeedProviderPagination,
  FeedProviderState,
} from "./types";

function resetPage(pagination: FeedProviderPagination): FeedProviderPagination {
  return {
    pageSize: pagination.pageSize,
    page: 0,
  };
}

export const reducer: Reducer<FeedProviderState, FeedProviderAction> = (
  state,
  action
) => {
  switch (action.type) {
    case FeedProviderActionKind.RESET_FILTERS: {
      return {
        pagination: resetPage(state.pagination),
        filters: {
          status: "",
          type: "",
          startDate: "",
          endDate: "",
        },
      };
    }
    case FeedProviderActionKind.SET_DATE_RANGE: {
      return {
        pagination: resetPage(state.pagination),
        filters: {
          ...state.filters,
          startDate: action.payload.start ?? "",
          endDate: action.payload.end ?? "",
        },
      };
    }
    case FeedProviderActionKind.SET_STATUS: {
      return {
        pagination: resetPage(state.pagination),
        filters: {
          ...state.filters,
          status: action.payload,
        },
      };
    }
    case FeedProviderActionKind.SET_TYPE: {
      return {
        pagination: resetPage(state.pagination),
        filters: {
          ...state.filters,
          type: action.payload,
        },
      };
    }
    case FeedProviderActionKind.SET_PAGE: {
      return {
        ...state,
        pagination: {
          ...state.pagination,
          page: action.payload,
        },
      };
    }
    case FeedProviderActionKind.SET_PAGE_SIZE: {
      return {
        ...state,
        pagination: {
          page: 0,
          pageSize: action.payload,
        },
      };
    }
  }
};
