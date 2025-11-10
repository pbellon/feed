"use client";

import { FeedEventStatus, FeedEventSubject } from "@feed/types";
import { useRouter, useSearchParams } from "next/navigation";
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import { reducer } from "./reducer";
import { FeedProviderActionKind, FeedProviderContextState } from "./types";
import { parseEventSearchParams } from "./utils";

type FeedProviderProps = {
  children: React.ReactNode;
};

export const FeedProviderContext =
  createContext<FeedProviderContextState | null>(null);

export function FeedProvider({ children }: FeedProviderProps) {
  const sp = useSearchParams();
  const router = useRouter();

  // lock to avoid infinite loop between useEffects below that enable
  // two-way sync between URL <-> local reducer state
  const updatingFromUrl = useRef(false);

  const [initialState] = useState(() => parseEventSearchParams(sp));

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

  const setStartDate = useCallback((start: string | "") => {
    dispatch({
      type: FeedProviderActionKind.SET_START_DATE,
      payload: start,
    });
  }, []);

  const setEndDate = useCallback((end: string | "") => {
    dispatch({
      type: FeedProviderActionKind.SET_END_DATE,
      payload: end,
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

  const hasFilters = useMemo(() => {
    return (
      state.filters.startDate !== "" ||
      state.filters.endDate !== "" ||
      state.filters.status !== "" ||
      state.filters.subject !== ""
    );
  }, [
    state.filters.endDate,
    state.filters.startDate,
    state.filters.status,
    state.filters.subject,
  ]);

  const value = useMemo<FeedProviderContextState>(
    () => ({
      filters: state.filters,
      pagination: state.pagination,
      hasFilters,
      setStatus,
      setSubject,
      setStartDate,
      setEndDate,
      setPage,
      setPageSize,
      resetFilters,
    }),
    [
      state.filters,
      state.pagination,
      hasFilters,
      setStatus,
      setSubject,
      setStartDate,
      setEndDate,
      setPage,
      setPageSize,
      resetFilters,
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

  // State => URL change
  useEffect(() => {
    // ensure we're not already updating from URL to avoid rewriting
    // history with current state
    if (updatingFromUrl.current) return;
    const next = buildSearchParams();
    const curr = sp.toString();
    if (next !== curr) {
      router.push(`?${next}`, { scroll: false });
    }
    // Disable to have single way of update (state => URL)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buildSearchParams, router]);

  // URL => state change
  useEffect(() => {
    updatingFromUrl.current = true;
    const state = parseEventSearchParams(sp);
    dispatch({ type: FeedProviderActionKind.UPDATE_STATE, payload: state });

    // "unlock" state => URL update, see effect just above
    queueMicrotask(() => {
      updatingFromUrl.current = false;
    });
  }, [sp]);

  return (
    <FeedProviderContext.Provider value={value}>
      {children}
    </FeedProviderContext.Provider>
  );
}
