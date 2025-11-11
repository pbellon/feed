"use client";

import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { usePathname, useRouter } from "next/navigation";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";

import { Website } from "@feed/types";

import styles from "./WebsiteSelector.module.css";

type WebsiteSelectorProps = {
  websites: Website[];
  websiteId: string;
};

export function WebsiteSelector({ websiteId, websites }: WebsiteSelectorProps) {
  const router = useRouter();
  const pathname = usePathname();

  const [currentWebsiteId, setCurrentWebsiteId] = useState(websiteId);

  const [_, startTransition] = useTransition();

  const subPath = useMemo(() => {
    return pathname.replace(`/${websiteId}/`, "");
  }, [pathname, websiteId]);

  const handleChange = useCallback(
    (e: SelectChangeEvent): void => {
      setCurrentWebsiteId(e.target.value);
      startTransition(() => {
        router.push(`/${e.target.value}/${subPath}`);
      });
    },
    [router, subPath],
  );

  // sync outside `websiteId` props with locally selected website
  useEffect(() => {
    setCurrentWebsiteId(websiteId);
  }, [websiteId]);

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
