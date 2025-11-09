import Paper from "@mui/material/Paper";

import { metadataGenerator } from "@/lib/metadata";
import { parseEventSearchParams } from "@/lib/searchParams";
import { getEvents } from "@/lib/api";
import TableContainer from "@mui/material/TableContainer";
import { FeedTable } from "./FeedTable";

export const generateMetadata = metadataGenerator("Activity feed");

export default async function ActivityPage({
  params,
  searchParams,
}: {
  params: Promise<{ websiteId: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { websiteId } = await params;
  const queryString = await searchParams;
  const data = await getEvents(websiteId, parseEventSearchParams(queryString));

  return (
    <TableContainer component={Paper}>
      <FeedTable data={data} />
    </TableContainer>
  );
}
