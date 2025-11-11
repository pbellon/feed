"use client";

import Container from "@mui/material/Container";
import { useSuspenseQuery } from "@tanstack/react-query";

import { getWebsites } from "@/lib/api";

import styles from "./NavBar.module.css";
import NavBarLinks from "./NavBarLinks";
import { WebsiteSelector } from "./WebsiteSelector";

export default function NavBar({ websiteId }: Readonly<{ websiteId: string }>) {
  const { data: websites } = useSuspenseQuery({
    queryKey: ["websites"],
    queryFn: getWebsites,
  });

  return (
    <div className={styles.navbar}>
      <Container>
        <div className={styles.separatorWrapper}>
          <WebsiteSelector websiteId={websiteId} websites={websites} />
          <NavBarLinks />
        </div>
      </Container>
    </div>
  );
}
