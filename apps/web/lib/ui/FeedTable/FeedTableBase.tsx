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
  active: boolean;
  column?: FeedSortableColumn;
  direction: SortOrder;
  name: string;
  onSort: ((e: React.MouseEvent<unknown>) => void) | undefined;
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
      { name: "Created at", column: FeedSortableColumn.CREATED_AT },
      { name: "Updated at", column: FeedSortableColumn.UPDATED_AT },
      { name: "Status", column: FeedSortableColumn.STATUS },
      { name: "Subject", column: FeedSortableColumn.SUBJECT },
      { name: "User" },
    ];

    return baseHeaders.map((col) => {
      const onSortHandler =
        col.column && onSort
          ? (_: React.MouseEvent<unknown>) => {
              onSort(col.column);
            }
          : undefined;

      const direction =
        sort?.column === col.column
          ? (sort?.order ?? SortOrder.ASCENDING)
          : SortOrder.ASCENDING;

      return {
        ...col,
        sortable: col.column !== undefined,
        active: sort?.column === col.column,
        onSort: onSortHandler,
        direction,
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
