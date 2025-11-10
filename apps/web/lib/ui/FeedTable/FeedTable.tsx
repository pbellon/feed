"use client";

import { useFeedProvider } from "@/lib/hooks/useFeedProvider";
import { useFeedQuery } from "@/lib/hooks/useFeedQuery";
import { EventStatusChip } from "@/lib/ui/EventStatus";
import { FeedEvent } from "@feed/types";

import Table from "@mui/material/Table";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TableCell from "@mui/material/TableCell";
import { useCallback } from "react";

import { FeedTableBase } from "./FeedTableBase";
import { FeedTableSkeleton } from "./FeedTableSkeleton";
import { FeedDateCellContent } from "./content/FeedDateCellContent";
import { FeedSubjectCellContent } from "./content/FeedSubjectCellContent";
import TableBody from "@mui/material/TableBody";

type FeedTableProps = {
  websiteId: string;
};

function FeedEventTableRow({ event }: Readonly<{ event: FeedEvent }>) {
  return (
    <TableRow>
      <TableCell>
        <FeedDateCellContent date={event.createdAt} />
      </TableCell>
      <TableCell>
        <FeedDateCellContent date={event.updatedAt} />
      </TableCell>
      <TableCell>
        <Box sx={{ display: "flex", justifyContent: "stretch" }}>
          <EventStatusChip sx={{ flexGrow: 1 }} status={event.status} />
        </Box>
      </TableCell>
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
  const { filters, pagination, sort, setPage, setPageSize, sortBy } =
    useFeedProvider();

  const { isLoading, data, isFetching } = useFeedQuery({
    websiteId,
    filters,
    pagination,
    sort,
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

  if (!isLoading && !isFetching && (data?.events ?? []).length == 0) {
    return (
      <>
        <Box sx={{ padding: "calc(var(--mui-spacing) * 2)" }}>
          <Typography variant="h4">No events found</Typography>
          <Typography>Please remove some filters</Typography>
        </Box>
        <FeedTableBase sort={sort} onSort={sortBy}>
          <TableFooter>
            <TablePagination
              count={data?.pagination.total ?? 0}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              page={pagination.page}
              rowsPerPage={pagination.pageSize}
              rowsPerPageOptions={[5, 10, 25]}
            />
          </TableFooter>
        </FeedTableBase>
      </>
    );
  }

  return (
    <FeedTableBase isPending={isFetching} sort={sort} onSort={sortBy}>
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
    </FeedTableBase>
  );
}
