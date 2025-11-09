"use client";

import { FeedEvent } from "@feed/types";
import {
  TableBody,
  TableFooter,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableCell from "node_modules/@mui/material/TableCell";
import { useFeedProvider } from "../FeedProvider";
import { useFeedQuery } from "../../hooks/useFeedQuery";
import { FeedTableSkeleton } from "./FeedTableSkeleton";
import { useCallback } from "react";
import { FeedSubjectCellContent } from "./FeedSubjectCellContent";
import Box from "node_modules/@mui/material/Box";
import { FeedDateCellContent } from "./FeedDateCellContent";
import { EventStatusChip } from "@/lib/ui/EventStatus";

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

  if (!isLoading && !isFetching && (data?.events ?? []).length == 0) {
    return (
      <Box sx={{ padding: "calc(var(--mui-spacing) * 2)" }}>
        <Typography variant="h4">No events found</Typography>
        <Typography>Please remove some filters</Typography>
      </Box>
    );
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
