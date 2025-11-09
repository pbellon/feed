"use client";

import { FeedEventStatus, FeedEventType } from "@feed/types";
import { useRouter, useSearchParams } from "next/navigation";
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import { reducer } from "./reducer";
import {
  FeedProviderActionKind,
  FeedProviderContextState,
  FeedProviderState,
} from "./types";

import { parseEventSearchParams } from "@/lib/searchParams";

type FeedProviderProps = {
  children: React.ReactNode;
};

export const FeedProviderContext =
  createContext<FeedProviderContextState | null>(null);

export function FeedProvider({ children }: FeedProviderProps) {
  const sp = useSearchParams();
  const router = useRouter();

  const [initialState] = useState((): FeedProviderState => {
    const query = parseEventSearchParams(sp);
    return {
      filters: {
        status: query.status ?? "",
        type: query.type ?? "",
        startDate: query.startDate ?? "",
        endDate: query.endDate ?? "",
      },
      pagination: {
        page: query.page ?? 0,
        pageSize: query.pageSize ?? 10,
      },
    };
  });

  const [state, dispatch] = useReducer(reducer, initialState);

  const setStatus = useCallback((status: FeedEventStatus | "") => {
    dispatch({
      type: FeedProviderActionKind.SET_STATUS,
      payload: status,
    });
  }, []);

  const setType = useCallback((type: FeedEventType | "") => {
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
    });
  }, []);

  const resetFilters = useCallback(() => {
    dispatch({
      type: FeedProviderActionKind.RESET_FILTERS,
    });
  }, []);

  const setPage = useCallback((page: number) => {
    dispatch({
      type: FeedProviderActionKind.SET_PAGE,
      payload: page,
    });
  }, []);

  const setPageSize = useCallback((pageSize: number) => {
    dispatch({
      type: FeedProviderActionKind.SET_PAGE_SIZE,
      payload: pageSize,
    });
  }, []);

  const value = useMemo<FeedProviderContextState>(
    () => ({
      filters: state.filters,
      pagination: state.pagination,
      setStatus,
      setType,
      setDateRange,
      setPage,
      setPageSize,
      resetFilters,
    }),
    [
      resetFilters,
      setDateRange,
      setPage,
      setPageSize,
      setStatus,
      setType,
      state.filters,
      state.pagination,
    ]
  );

  const buildSearchParams = useCallback(() => {
    const s = new URLSearchParams();

    // filtres
    if (state.filters.status) s.set("status", state.filters.status);
    if (state.filters.type) s.set("type", state.filters.type);
    if (state.filters.startDate) s.set("startDate", state.filters.startDate);
    if (state.filters.endDate) s.set("endDate", state.filters.endDate);

    // pagination
    s.set("page", String(state.pagination.page));
    s.set("pageSize", String(state.pagination.pageSize));

    return s.toString();
  }, [state.filters, state.pagination]);

  // Synchronise l'URL quand l'état change
  useEffect(() => {
    const next = buildSearchParams();
    const curr = sp.toString();
    if (next !== curr) {
      router.replace(`?${next}`, { scroll: false });
    }
  }, [buildSearchParams, router, sp]);

  return (
    <FeedProviderContext.Provider value={value}>
      {children}
    </FeedProviderContext.Provider>
  );
}
