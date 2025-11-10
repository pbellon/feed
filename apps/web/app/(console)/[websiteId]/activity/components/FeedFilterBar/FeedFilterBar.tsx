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
    <Paper className={styles.filterBar}>
      <Tooltip title="Feed events filter">
        <div className={styles.barIconHolder}>
          <FilterAltIcon fontSize="large" />
        </div>
      </Tooltip>
      <div className={styles.filtersHolder}>
        <FeedStatusFilter
          className={styles.filter}
          onChange={setStatus}
          value={filters.status}
        />
        <FeedSubjectFilter
          className={styles.filter}
          onChange={setSubject}
          value={filters.subject}
        />
        <FeedDateFilter
          className={styles.filter}
          label="Start date"
          onChange={setStartDate}
          value={filters.startDate}
        />
        <FeedDateFilter
          className={styles.filter}
          label="End date"
          onChange={setEndDate}
          value={filters.endDate}
        />
      </div>
      <Tooltip title="Clear filters">
        <span className={styles.clearButtonWrapper}>
          <Button
            variant="contained"
            color="warning"
            size="large"
            className={styles.clearButton}
            onClick={resetFilters}
            disabled={!hasFilters}
          >
            <DeleteIcon />
          </Button>
        </span>
      </Tooltip>
    </Paper>
  );
}
