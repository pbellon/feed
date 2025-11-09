"use client";

import { use } from "react";
import { FeedProviderContext } from "./FeedProvider";
import { FeedProviderContextState } from "./types";

export function useFeedProvider(): FeedProviderContextState {
  const ctx = use(FeedProviderContext);
  if (!ctx)
    throw new Error("useFeedProvider must be used within <FeedProvider>");
  return ctx;
}
