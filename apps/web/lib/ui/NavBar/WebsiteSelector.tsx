"use client";

import { Website } from "@feed/types";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

import styles from "./WebsiteSelector.module.css";

export function WebsiteSelector({ websites }: { websites: Website[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const { websiteId } = useParams<{ websiteId: string }>();

  const subPath = useMemo(() => {
    return pathname.replace(`/${websiteId}/`, "");
  }, [pathname, websiteId]);

  const handleChange = useCallback(
    (e: SelectChangeEvent<string>): void => {
      router.push(`/${e.target.value}/${subPath}`);
    },
    [router, websiteId, subPath]
  );

  return (
    <Select
      className={styles.selector}
      value={websiteId}
      onChange={handleChange}
      disableUnderline
      variant="standard"
    >
      {websites.map(({ id, domain }) => (
        <MenuItem key={id} value={id}>
          {domain}
        </MenuItem>
      ))}
    </Select>
  );
}
