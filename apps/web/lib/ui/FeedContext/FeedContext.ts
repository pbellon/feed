import { createContext } from "react";
import { FeedContextValue } from "./types";

export const FeedProviderContext = createContext<FeedContextValue | null>(null);
