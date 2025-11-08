import { Skeleton, TableBody, TableCell, TableRow } from "@mui/material";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "node_modules/@mui/material/Table";

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

export default function Loading() {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          <TableRow>
            <SkeletonTableRows nbRows={10} />
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
