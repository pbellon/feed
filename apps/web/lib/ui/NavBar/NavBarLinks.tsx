"use client";

import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import { useParams, usePathname } from "next/navigation";

export default function NavBarLinks() {
  const { websiteId } = useParams<{ websiteId: string }>();
  const pathname = usePathname();

  return (
    <Stack direction="row" spacing={2} divider={<span>/</span>}>
      <Link href={`/${websiteId}/console`}>Console</Link>
      <Link href={`/${websiteId}/projects`}>Projects</Link>
      <Link href={`/${websiteId}/websites`}>Websites</Link>
      <Link href={`/${websiteId}/configuration`}>Configuration</Link>
      <Link href={`/${websiteId}/activity`}>Activity feed</Link>
    </Stack>
  );
}
