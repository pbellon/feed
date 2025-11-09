import Paper from "@mui/material/Paper";

import { metadataGenerator } from "@/lib/metadata";
import TableContainer from "@mui/material/TableContainer";
import { FeedTable } from "./components/FeedTable/FeedTable";
import FeedProvider from "./components/FeedProvider";
import FeedFilterBar from "./components/FeedFilterBar";

export const generateMetadata = metadataGenerator("Activity feed");

export default async function ActivityPage({
  params,
}: {
  params: Promise<{ websiteId: string }>;
}) {
  const { websiteId } = await params;

  return (
    <FeedProvider>
      <FeedFilterBar />
      <TableContainer component={Paper}>
        <FeedTable websiteId={websiteId} />
      </TableContainer>
    </FeedProvider>
  );
}
