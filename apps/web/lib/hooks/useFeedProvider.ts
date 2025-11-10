"use client";

import { use } from "react";

import { type FeedContextValue } from "@/lib/ui/FeedContext/types";
import { FeedProviderContext } from "@/lib/ui/FeedContext/FeedContext";

export function useFeedProvider(): FeedContextValue {
  const ctx = use(FeedProviderContext);
  if (!ctx)
    throw new Error("useFeedProvider must be used within <FeedProvider>");
  return ctx;
}
