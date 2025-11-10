import { Reducer } from "react";
import {
  FeedContextAction,
  FeedProviderActionKind,
  FeedProviderPagination,
  FeedContextState,
} from "./types";

function resetPage(pagination: FeedProviderPagination): FeedProviderPagination {
  return {
    pageSize: pagination.pageSize,
    page: 0,
  };
}

export const reducer: Reducer<FeedContextState, FeedContextAction> = (
  state,
  action
) => {
  switch (action.type) {
    case FeedProviderActionKind.RESET_FILTERS: {
      return {
        pagination: resetPage(state.pagination),
        filters: {
          status: "",
          subject: "",
          startDate: "",
          endDate: "",
        },
      };
    }
    case FeedProviderActionKind.SET_START_DATE: {
      return {
        pagination: resetPage(state.pagination),
        filters: {
          ...state.filters,
          startDate: action.payload,
        },
      };
    }
    case FeedProviderActionKind.SET_END_DATE: {
      return {
        pagination: resetPage(state.pagination),
        filters: {
          ...state.filters,
          endDate: action.payload,
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
    case FeedProviderActionKind.SET_SUBJECT: {
      return {
        pagination: resetPage(state.pagination),
        filters: {
          ...state.filters,
          subject: action.payload,
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

    case FeedProviderActionKind.UPDATE_STATE: {
      return {
        pagination: action.payload.pagination,
        filters: action.payload.filters,
      };
    }
  }
};
