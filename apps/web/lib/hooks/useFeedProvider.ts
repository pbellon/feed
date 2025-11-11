"use client";

import { use } from "react";

import { FeedProviderContext } from "@/lib/FeedContext/FeedContext";
import { type FeedContextValue } from "@/lib/FeedContext/types";

export function useFeedProvider(): FeedContextValue {
  const ctx = use(FeedProviderContext);
  if (!ctx)
    throw new Error("useFeedProvider must be used within <FeedProvider>");
  return ctx;
}
