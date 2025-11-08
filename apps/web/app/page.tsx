import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { getWebsites } from "@/lib/api";
/**
 * Root server component dedicated to redirect to proper console route if
 * API returns websites
 */
export default async function Home() {
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

  const last = (await cookies()).get("lastWebsiteId")?.value;
  const firstWebsite = websites[0]!; // safe use of ! because of previous length check
  let website = firstWebsite;

  // will try to find website from ID stored in cookie
  if (last) {
    // default to first website if not found
    website =
      websites.find((website) => website.id.toString() === last) ??
      firstWebsite;
  }

  return redirect(`/${website.id}/activity`);
}
