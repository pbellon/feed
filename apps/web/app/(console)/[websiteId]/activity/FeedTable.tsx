import { FeedEvent, FeedEventsReply } from "@feed/types";
import { TableBody, TableRow } from "@mui/material";
import Table from "@mui/material/Table";
import TableCell from "node_modules/@mui/material/TableCell";

type FeedTableProps = {
  data: FeedEventsReply;
};

function FeedEventTableRow({ event }: Readonly<{ event: FeedEvent }>) {
  return (
    <TableRow>
      {/* TODO: parse date with date-fns */}
      <TableCell>{event.createdAt}</TableCell>
      {/* */}
      <TableCell>{event.status}</TableCell>
      <TableCell>
        {event.type}
        <br />
        {event.description}
      </TableCell>
      <TableCell>{event.user.fullName}</TableCell>
    </TableRow>
  );
}

export function FeedTable(props: FeedTableProps) {
  return (
    <Table>
      <TableBody>
        {props.data.events.map((event) => (
          <FeedEventTableRow key={event.id} event={event} />
        ))}
      </TableBody>
    </Table>
  );
}
