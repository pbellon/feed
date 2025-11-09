import { act, Reducer } from "react";
import {
  FeedProviderAction,
  FeedProviderActionKind,
  FeedProviderState,
} from "./types";

export const reducer: Reducer<FeedProviderState, FeedProviderAction> = (
  state,
  action
) => {
  switch (action.type) {
    case FeedProviderActionKind.RESET_FILTERS: {
      return {
        ...state,
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
        ...state,
        filters: {
          ...state.filters,
          startDate: action.payload.start ?? "",
          endDate: action.payload.end ?? "",
        },
      };
    }
    case FeedProviderActionKind.SET_STATUS: {
      return {
        ...state,
        filters: {
          ...state.filters,
          status: action.payload,
        },
      };
    }
    case FeedProviderActionKind.SET_TYPE: {
      return {
        ...state,
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
          ...state.pagination,
          pageSize: action.payload,
        },
      };
    }
  }
};
