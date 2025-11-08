"use client";

import { Website } from "@feed/types";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useCallback, useMemo, useState, useTransition } from "react";

import styles from "./WebsiteSelector.module.css";

export function WebsiteSelector({ websites }: { websites: Website[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const { websiteId } = useParams<{ websiteId: string }>();

  const [currentWebsiteId, setCurrentWebsiteId] = useState(websiteId);

  const [_, startTransition] = useTransition();

  const subPath = useMemo(() => {
    return pathname.replace(`/${websiteId}/`, "");
  }, [pathname, websiteId]);

  const handleChange = useCallback(
    (e: SelectChangeEvent): void => {
      setCurrentWebsiteId(e.target.value);
      startTransition(() => {
        // update cookie
        document.cookie = `lastWebsiteId=${e.target.value}; Path=/; Max-Age=7776000`;
        router.push(`/${e.target.value}/${subPath}`);
      });
    },
    [router, subPath]
  );

  return (
    <Select
      className={styles.selector}
      id="website-selector"
      value={currentWebsiteId}
      onChange={handleChange}
      disableUnderline
      variant="standard"
      MenuProps={{
        PopoverClasses: { root: styles.popover },
        PaperProps: { sx: { mt: 1, borderRadius: 2 } },
      }}
    >
      {websites.map(({ id, domain }) => (
        <MenuItem key={id} value={id}>
          {domain}
        </MenuItem>
      ))}
    </Select>
  );
}
