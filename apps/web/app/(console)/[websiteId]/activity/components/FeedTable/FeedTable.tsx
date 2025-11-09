"use client";

import { FeedEvent } from "@feed/types";
import {
  TableBody,
  TableFooter,
  TablePagination,
  TableRow,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableCell from "node_modules/@mui/material/TableCell";
import { useFeedProvider } from "../FeedProvider";
import { useFeedQuery } from "../../hooks/useFeedQuery";
import { FeedTableSkeleton } from "./FeedTableSkeleton";
import { useCallback } from "react";
import { FeedSubjectCellContent } from "./FeedSubjectCellContent";

type FeedTableProps = {
  websiteId: string;
};

function FeedEventTableRow({ event }: Readonly<{ event: FeedEvent }>) {
  return (
    <TableRow>
      {/* TODO: parse date with date-fns */}
      <TableCell>{event.createdAt}</TableCell>
      {/* */}
      <TableCell>{event.status}</TableCell>
      <TableCell>
        <FeedSubjectCellContent
          subject={event.subject}
          description={event.description}
        />
      </TableCell>
      <TableCell>{event.user.fullName}</TableCell>
    </TableRow>
  );
}

export function FeedTable({ websiteId }: FeedTableProps) {
  const { filters, pagination, setPage, setPageSize } = useFeedProvider();

  const { isLoading, data, isFetching } = useFeedQuery({
    websiteId,
    filters,
    pagination,
  });

  const handlePageChange = useCallback(
    (_: unknown, newPage: number) => {
      setPage(newPage);
    },
    [setPage]
  );

  const handleRowsPerPageChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPageSize(parseInt(e.target.value, 10));
    },
    [setPageSize]
  );

  if (!data && isLoading) {
    return <FeedTableSkeleton />;
  }

  return (
    <Table sx={{ opacity: isFetching ? 0.5 : 1 }}>
      <TableBody>
        {(data?.events ?? []).map((event) => (
          <FeedEventTableRow key={event.id} event={event} />
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TablePagination
            count={data?.pagination.total ?? 0}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleRowsPerPageChange}
            page={pagination.page}
            rowsPerPage={pagination.pageSize}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </TableRow>
      </TableFooter>
    </Table>
  );
}
