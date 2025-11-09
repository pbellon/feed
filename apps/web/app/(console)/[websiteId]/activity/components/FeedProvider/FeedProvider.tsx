import { FeedEventStatusEnum, FeedEventTypeEnum } from "@feed/types";
import { createContext, SetStateAction, useCallback, useMemo, useReducer, useState } from "react";
import { FeedProviderActionKind, FeedProviderContextState, FeedProviderState } from "./types";
import { parseEventSearchParams } from "@/lib/searchParams";
import { useSearchParams } from "next/navigation";
import { reducer } from "./reducer";


export const FeedProviderContext = createContext<FeedProviderState | null>(null);

export function FeedProvider({ children }: FeedProviderProps) {
  const sp = useSearchParams();
  const [initialState]  = useState(():FeedProviderState  => {
    const query = parseEventSearchParams(sp);
    return {
      filters: {
        status: query.status || "",
        type: query.type || "",
        startDate: query.startDate || "",
        endDate: query.endDate || "",
      },
      pagination: 
    }
  
  });

  const [state, dispatch ] = useReducer(reducer, initialState);

  const setStatus = useCallback((status: FeedEventStatusEnum | "") => {
    dispatch({
      type: FeedProviderActionKind.SET_STATUS,
      payload: status,
    });
  }, []);

  const setType = useCallback((type: FeedEventTypeEnum | "") => {
    dispatch({
      type: FeedProviderActionKind.SET_TYPE,
      payload: type,
    });
  }, []);

  const setDateRange = useCallback((start: string | "", end: string | "") => {
    dispatch({
      type: FeedProviderActionKind.SET_DATE_RANGE,
      payload: {
        start,
        end,
      },
    })
  },[]);

  const resetFilters = useCallback(() => {
    dispatch({
      type: FeedProviderActionKind.RESET_FILTERS
    })
  }, []);

  const setPage = useCallback((page: number) => {
    dispatch({
      type: FeedProviderActionKind.SET_PAGE,
      payload: page,
    })
  }, []);

  const setPageSize = useCallback((pageSize: number) => {
    dispatch({
      type: FeedProviderActionKind.SET_PAGE_SIZE,
      payload: pageSize
    })
  }, [])
  
  const value = useMemo<FeedProviderContextState>(() => ({
    filters: state.filters,
    pagination: state.pagination,
    setStatus,
    setType,
    setDateRange,
    setPage,
    setPageSize,
    resetFilters,
  }), []);

  return (
    <FeedProviderContext.Provider value={value}>
      { children }
    </FeedProviderContext.Provider>
  );
}

