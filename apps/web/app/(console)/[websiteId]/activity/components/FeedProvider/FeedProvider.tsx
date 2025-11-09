"use client";

import { FeedEventStatus, FeedEventSubject, FeedEventType } from "@feed/types";
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
    console.log("initial state: ", query);
    return {
      filters: {
        status: query.status ?? "",
        subject: query.subject ?? "",
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

  const setSubject = useCallback((type: FeedEventSubject | "") => {
    dispatch({
      type: FeedProviderActionKind.SET_SUBJECT,
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
      setSubject,
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
      setSubject,
      state.filters,
      state.pagination,
    ]
  );

  const buildSearchParams = useCallback(() => {
    const s = new URLSearchParams();

    // filtres
    if (state.filters.status) s.set("status", state.filters.status);
    if (state.filters.subject) s.set("subject", state.filters.subject);
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
      router.push(`?${next}`, { scroll: false });
    }
  }, [buildSearchParams, router, sp]);

  return (
    <FeedProviderContext.Provider value={value}>
      {children}
    </FeedProviderContext.Provider>
  );
}
