import { createContext } from "react";
import { FeedProviderContextState } from "./types";

export const FeedProviderContext =
  createContext<FeedProviderContextState | null>(null);
