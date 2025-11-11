"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";

import type {
  FeedEventStatus,
  FeedEventSubject,
  FeedSortableColumn,
} from "@feed/types";

import { FeedProviderContext } from "./FeedContext";
import { reducer } from "./reducer";
import { FeedContextActionKind, FeedContextValue } from "./types";
import { parseEventSearchParams } from "./utils";

type FeedProviderProps = {
  children: React.ReactNode;
};

export function FeedContextProvider({ children }: FeedProviderProps) {
  const sp = useSearchParams();
  const router = useRouter();

  // lock to avoid infinite loop between useEffects below that enable
  // two-way sync between URL <-> local reducer state
  const updatingFromUrl = useRef(false);

  const [initialState] = useState(() => parseEventSearchParams(sp));

  const [state, dispatch] = useReducer(reducer, initialState);

  const setStatus = useCallback((status: FeedEventStatus | "") => {
    dispatch({
      type: FeedContextActionKind.SET_STATUS,
      payload: status,
    });
  }, []);

  const setSubject = useCallback((type: FeedEventSubject | "") => {
    dispatch({
      type: FeedContextActionKind.SET_SUBJECT,
      payload: type,
    });
  }, []);

  const setStartDate = useCallback((start: string | "") => {
    dispatch({
      type: FeedContextActionKind.SET_START_DATE,
      payload: start,
    });
  }, []);

  const setEndDate = useCallback((end: string | "") => {
    dispatch({
      type: FeedContextActionKind.SET_END_DATE,
      payload: end,
    });
  }, []);

  const resetFilters = useCallback(() => {
    dispatch({
      type: FeedContextActionKind.RESET_FILTERS,
    });
  }, []);

  const setPage = useCallback((page: number) => {
    dispatch({
      type: FeedContextActionKind.SET_PAGE,
      payload: page,
    });
  }, []);

  const setPageSize = useCallback((pageSize: number) => {
    dispatch({
      type: FeedContextActionKind.SET_PAGE_SIZE,
      payload: pageSize,
    });
  }, []);

  const sortBy = useCallback((column: FeedSortableColumn) => {
    dispatch({
      type: FeedContextActionKind.SORT_BY_COLUMN,
      payload: column,
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

  const value = useMemo<FeedContextValue>(
    () => ({
      filters: state.filters,
      pagination: state.pagination,
      sort: state.sort,
      hasFilters,
      setStatus,
      setSubject,
      setStartDate,
      setEndDate,
      setPage,
      setPageSize,
      sortBy,
      resetFilters,
    }),
    [
      state.filters,
      state.pagination,
      state.sort,
      hasFilters,
      setStatus,
      setSubject,
      setStartDate,
      setEndDate,
      setPage,
      setPageSize,
      sortBy,
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

    s.set("sortBy", state.sort.column);
    s.set("sortOrder", state.sort.order);

    // pagination
    s.set("page", String(state.pagination.page));
    s.set("pageSize", String(state.pagination.pageSize));

    return s.toString();
  }, [
    state.filters.endDate,
    state.filters.startDate,
    state.filters.status,
    state.filters.subject,
    state.pagination.page,
    state.pagination.pageSize,
    state.sort.column,
    state.sort.order,
  ]);

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
    dispatch({ type: FeedContextActionKind.UPDATE_STATE, payload: state });

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
