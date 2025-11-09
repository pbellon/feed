import { Skeleton } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

function SkeletonTableRows({ nbRows }: { nbRows: number }) {
  return [...Array(nbRows)].map((_, index) => (
    <TableRow key={index}>
      <TableCell>
        <Skeleton animation="wave" variant="text" />
      </TableCell>
      <TableCell>
        <Skeleton animation="wave" variant="text" />
      </TableCell>
      <TableCell>
        <Skeleton animation="wave" variant="text" />
      </TableCell>
      <TableCell>
        <Skeleton animation="wave" variant="text" />
      </TableCell>
    </TableRow>
  ));
}

export function FeedTableSkeleton() {
  return (
    <Table>
      <TableBody>
        <SkeletonTableRows nbRows={10} />
      </TableBody>
    </Table>
  );
}
