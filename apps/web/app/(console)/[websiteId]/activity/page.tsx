import Paper from "@mui/material/Paper";

import { metadataGenerator } from "@/lib/metadata";
import TableContainer from "@mui/material/TableContainer";
import FeedContextProvider from "@/lib/ui/FeedContext";
import FeedFilterBar from "@/lib/ui/FeedFilterBar";
import FeedTable from "@/lib/ui/FeedTable";

export const generateMetadata = metadataGenerator("Activity feed");

export default async function ActivityPage({
  params,
}: {
  params: Promise<{ websiteId: string }>;
}) {
  const { websiteId } = await params;

  return (
    <FeedContextProvider>
      <FeedFilterBar />
      <TableContainer component={Paper}>
        <FeedTable websiteId={websiteId} />
      </TableContainer>
    </FeedContextProvider>
  );
}
