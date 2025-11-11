"use client";

import Stack from "@mui/material/Stack";
import clsx from "clsx";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useMemo } from "react";

type Link = {
  href: string;
  active: boolean;
  text: React.ReactNode;
};

export default function NavBarLinks() {
  const { websiteId } = useParams<{ websiteId: string }>();
  const pathname = usePathname();

  const links: Link[] = useMemo(
    () =>
      [
        { path: "console", text: "Console" },
        { path: "projects", text: "Projects" },
        { path: "websites", text: "Websites" },
        { path: "configuration", text: "Configuration" },
        { path: "activity", text: "Activity feed" },
      ].map((link) => {
        const href = `/${websiteId}/${link.path}`;
        return {
          href,
          text: link.text,
          active: pathname.startsWith(href),
        };
      }),
    [websiteId, pathname],
  );

  return (
    <Stack direction="row" spacing={2} divider={<span>/</span>}>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={clsx({
            active: link.active,
          })}
        >
          {link.text}
        </Link>
      ))}
    </Stack>
  );
}
