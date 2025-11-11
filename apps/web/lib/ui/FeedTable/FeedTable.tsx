"use client";

import Box from "@mui/material/Box";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { useCallback } from "react";

import { FeedEvent } from "@feed/types";

import { useFeedProvider } from "@/lib/hooks/useFeedProvider";
import { useFeedQuery } from "@/lib/hooks/useFeedQuery";
import { EventStatusChip } from "@/lib/ui/EventStatus";

import { FeedDateCellContent } from "./content/FeedDateCellContent";
import { FeedSubjectCellContent } from "./content/FeedSubjectCellContent";
import { FeedUserCellContent } from "./content/FeedUserCellContent";
import { FeedTableBase } from "./FeedTableBase";
import { FeedTableSkeleton } from "./FeedTableSkeleton";

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
      <TableCell>
        <FeedUserCellContent user={event.user} />
      </TableCell>
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
      <FeedTableBase sort={sort} onSort={sortBy}>
        <TableBody>
          <TableRow>
            <TableCell colSpan={5}>
              <Typography variant="h4">No events found</Typography>
              <Typography>Please remove some filters</Typography>
            </TableCell>
          </TableRow>
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
