"use client";

import Paper from "@mui/material/Paper";
import FilterAltIcon from "@mui/icons-material/FilterAltOutlined";
import { useFeedProvider } from "../FeedProvider";
import { FeedStatusFilter } from "./FeedStatusFilter";
import { FeedSubjectFilter } from "./FeedSubjectFilter";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";

export function FeedFilterBar() {
  const { filters, setStatus, setSubject } = useFeedProvider();
  return (
    <Paper
      sx={{
        backgroundColor: "var(--secondary-background)",
        padding: "0.5rem",
        marginBottom: "1rem",
        alignItems: "center",
        display: "flex",
        gap: "var(--mui-spacing)",
      }}
    >
      <Tooltip title="Feed events filter">
        <Box
          sx={{
            width: 40,
            height: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <FilterAltIcon fontSize="large" />
        </Box>
      </Tooltip>
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
      <FeedSubjectFilter
        sx={{
          backgroundColor: "var(--main-background)",
          minWidth: 200,
          paddingTop: 0,
          paddingBottom: 0,
        }}
        value={filters.subject}
        onChange={setSubject}
      />
    </Paper>
  );
}
