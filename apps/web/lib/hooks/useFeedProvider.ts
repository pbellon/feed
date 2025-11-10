"use client";

import { use } from "react";

import { type FeedProviderContextState } from "@/lib/ui/FeedProvider/types";
import { FeedProviderContext } from "@/lib/ui/FeedProvider/FeedProviderContext";

export function useFeedProvider(): FeedProviderContextState {
  const ctx = use(FeedProviderContext);
  if (!ctx)
    throw new Error("useFeedProvider must be used within <FeedProvider>");
  return ctx;
}
