import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import { useMemo } from "react";

import { FeedSortableColumn, SortOrder } from "@feed/types";

import { type FeedContextSort } from "../../FeedContext/types";

type FeedTableBaseProps = {
  children: React.ReactNode;
  isPending?: boolean;
  onSort?: (column: FeedSortableColumn) => void;
  sort?: FeedContextSort;
};

type FeedTableHeader = {
  /** Represents if the column is currently used as sort column */
  active: boolean;
  /** Width of the column */
  width: string;
  /**
   * Current sort order for this column, depends on {@link FeedTableBaseProps.sort}.
   * Either ascending or descending.
   */
  direction: SortOrder;
  /**
   * Visual name of the column
   */
  name: string;
  /**
   * Handler called when sort icon is clicked. Will call {@link FeedTableBaseProps.onSort} with
   * proper {@link FeedSortableColumn} set.
   */
  onSort: ((e: React.MouseEvent<unknown>) => void) | undefined;
  /**
   * Explicit boolean saying if the column can be used for sorting feeds
   */
  sortable: boolean;
};

/**
 * Basic table structure for the feed event, do not use directly, rely on
 * FeedTable instead. Reserved for the FeedTable subfolder only.
 */
export function FeedTableBase({
  children,
  isPending,
  onSort,
  sort,
}: FeedTableBaseProps) {
  const headers = useMemo((): FeedTableHeader[] => {
    const baseHeaders = [
      {
        name: "Created at",
        column: FeedSortableColumn.CREATED_AT,
        width: "15%",
      },
      {
        name: "Updated at",
        column: FeedSortableColumn.UPDATED_AT,
        width: "15%",
      },
      { name: "Status", column: FeedSortableColumn.STATUS, width: "10%" },
      { name: "Subject", column: FeedSortableColumn.SUBJECT, width: "35%" },
      { name: "User", width: "25%" },
    ];

    return baseHeaders.map((col): FeedTableHeader => {
      let onSortHandler = undefined;
      let direction = SortOrder.ASCENDING;
      let active = false;

      if (col.column && onSort) {
        onSortHandler = (_: React.MouseEvent<unknown>) => {
          onSort(col.column);
        };
      }

      if (sort?.column === col.column) {
        active = true;
        direction = sort?.order ?? SortOrder.ASCENDING;
      }

      return {
        active,
        direction,
        name: col.name,
        onSort: onSortHandler,
        sortable: col.column !== undefined,
        width: col.width,
      };
    });
  }, [onSort, sort?.column, sort?.order]);

  return (
    <Table sx={{ opacity: isPending ? 0.5 : 1 }}>
      <TableHead>
        <TableRow>
          {headers.map((header) => (
            <TableCell
              key={header.name}
              width={header.width}
              sortDirection={
                header.active ? (sort?.order ?? SortOrder.ASCENDING) : false
              }
            >
              <TableSortLabel
                disabled={!header.sortable}
                direction={header.direction}
                active={header.active}
                onClick={header.onSort}
              >
                {header.name}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      {children}
    </Table>
  );
}
