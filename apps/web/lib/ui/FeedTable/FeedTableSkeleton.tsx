import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

import { FeedTableBase } from "./FeedTableBase";
import { FeedSubjectCellContentSkeleton } from "./content/FeedSubjectCellContent";
import Skeleton from "@mui/material/Skeleton";

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
        <Skeleton
          animation="wave"
          variant="rounded"
          height={32}
          sx={{ borderRadius: "32px" }}
        />
      </TableCell>
      <TableCell>
        <FeedSubjectCellContentSkeleton />
      </TableCell>
      <TableCell>
        <Skeleton animation="wave" variant="text" />
      </TableCell>
    </TableRow>
  ));
}

export function FeedTableSkeleton() {
  return (
    <FeedTableBase>
      <TableBody>
        <SkeletonTableRows nbRows={10} />
      </TableBody>
    </FeedTableBase>
  );
}
