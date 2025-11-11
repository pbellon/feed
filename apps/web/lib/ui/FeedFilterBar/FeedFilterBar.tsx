"use client";

import DeleteIcon from "@mui/icons-material/Delete";
import FilterAltIcon from "@mui/icons-material/FilterAltOutlined";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";
import Tooltip from "@mui/material/Tooltip";

import { useFeedProvider } from "@/lib/hooks/useFeedProvider";

import styles from "./FeedFilterBar.module.css";
import FeedDateFilter from "./filters/FeedDateFilter";
import FeedStatusFilter from "./filters/FeedStatusFilter";
import FeedSubjectFilter from "./filters/FeedSubjectFilter";

export function FeedFilterBarSkeleton() {
  return (
    <Paper className={styles.filterBar}>
      <Skeleton animation="wave" />
    </Paper>
  );
}

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
      <Tooltip title="Feed events filter" placement="top">
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
          label="Creation start date"
          onChange={setStartDate}
          value={filters.startDate}
        />
        <FeedDateFilter
          className={styles.filter}
          label="Creation end date"
          onChange={setEndDate}
          value={filters.endDate}
        />
      </div>
      <Tooltip title="Clear filters" placement="top">
        <span className={styles.clearButtonWrapper}>
          <Button
            aria-label="Reset filters"
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
