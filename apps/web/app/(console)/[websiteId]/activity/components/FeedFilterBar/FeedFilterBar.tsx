"use client";

import Paper from "@mui/material/Paper";
import FilterAltIcon from "@mui/icons-material/FilterAltOutlined";
import { useFeedProvider } from "../FeedProvider";
import { FeedStatusFilter } from "./FeedStatusFilter";
import { FeedSubjectFilter } from "./FeedSubjectFilter";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";

import styles from "./FeedFilterBar.module.css";
import { FeedDateFilter } from "./FeedDateFilter";
import Button from "@mui/material/Button";

export function FeedFilterBar() {
  const {
    filters,
    hasFilters,
    setStatus,
    setSubject,
    setStartDate,
    setEndDate,
    resetFilters,
  } = useFeedProvider();
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
        <div className={styles.barIconHolder}>
          <FilterAltIcon fontSize="large" />
        </div>
      </Tooltip>
      <FeedStatusFilter
        className={styles.filter}
        value={filters.status}
        onChange={setStatus}
      />
      <FeedSubjectFilter
        className={styles.filter}
        value={filters.subject}
        onChange={setSubject}
      />
      <FeedDateFilter
        label="Start date"
        onChange={setStartDate}
        value={filters.startDate}
      />
      <FeedDateFilter
        label="End date"
        onChange={setEndDate}
        value={filters.endDate}
      />

      <Tooltip title="Clear filters">
        <Button
          variant="contained"
          size="large"
          className={styles.clearButton}
          onClick={resetFilters}
          disabled={!hasFilters}
        >
          <DeleteIcon />
        </Button>
      </Tooltip>
    </Paper>
  );
}
