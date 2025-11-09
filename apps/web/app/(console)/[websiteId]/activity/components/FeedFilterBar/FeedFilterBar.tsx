"use client";

import Paper from "node_modules/@mui/material/Paper";
import { useFeedProvider } from "../FeedProvider";
import { FeedStatusFilter } from "./FeedStatusFilter";

export function FeedFilterBar() {
  const { filters, setStatus } = useFeedProvider();
  return (
    <Paper
      sx={{
        backgroundColor: "var(--secondary-background)",
        padding: "0.5rem",
        marginBottom: "1rem",
        display: "flex",
        gap: "1rem",
      }}
    >
      <FeedStatusFilter
        sx={{
          backgroundColor: "var(--main-background)",
          minWidth: 200,
          paddingTop: 0,
          paddingBottom: 0,
        }}
        value={filters.status}
        onChange={setStatus}
      />
    </Paper>
  );
}
