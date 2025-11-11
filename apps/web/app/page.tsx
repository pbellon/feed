import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { redirect } from "next/navigation";
import { Suspense } from "react";

import { getWebsites } from "@/lib/api";
import { LoadingPlaceholder } from "@/lib/ui/LoadingPlaceholder";

/**
 * Actual component doing fetch & redirect logic that can be wrapped in
 * Suspense. This is done to simplify build process.
 *
 */
async function HomeContent() {
  const websites = await getWebsites();

  if (websites.length == 0) {
    return (
      <div>
        <Box sx={{ maxWidth: 500 }}>
          <Typography variant="h2">No websites found</Typography>
          <Typography variant="body1">
            Check that your database is properly initialized
          </Typography>
        </Box>
      </div>
    );
  }

  // safe use of ! because of previous length check
  return redirect(`/${websites[0]!.id}/activity`);
}
/**
 * Root server component dedicated to redirect to proper console route if
 * API returns websites
 */
export default async function Home() {
  return (
    <Suspense fallback={<LoadingPlaceholder />}>
      <HomeContent />
    </Suspense>
  );
}
