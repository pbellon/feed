import { FeedSortableColumn, SortOrder } from "@feed/types";

export function getColumnFromFeedSortableColumn(
  column: FeedSortableColumn
): string {
  switch (column) {
    case FeedSortableColumn.CREATED_AT:
      return "created_at";
    case FeedSortableColumn.UPDATED_AT:
      return "updated_at";
    case FeedSortableColumn.STATUS:
      return "event_status";
    case FeedSortableColumn.SUBJECT:
      return "event_subject";
  }
}

export function getSortOrder(order: SortOrder): string {
  switch (order) {
    case SortOrder.ASCENDING:
      return "ASC";
    case SortOrder.DESCENDING:
      return "DESC";
  }
}
