"use client";
import { Typography } from "@mui/material";
import Link from "next/link";
import { useParams } from "next/navigation";

export function NotImplementedPage() {
  const { websiteId } = useParams();
  return (
    <>
      <Typography variant="h2">Not implemented</Typography>
      <Typography variant="body1">
        This page is here for demo purposes. Check the{" "}
        <Link href={`/${websiteId}/activity`}>activity</Link> page.
      </Typography>
    </>
  );
}
