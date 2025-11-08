import api from "@/lib/api";
import NavBarLinks from "./NavBarLinks";
import { WebsiteSelector } from "./WebsiteSelector";
import Container from "@mui/material/Container";

import styles from "./NavBar.module.css";

export default async function NavBar() {
  const websites = await api.getWebsites();

  return (
    <div className={styles.navbar}>
      <Container>
        <WebsiteSelector websites={websites} />
        <NavBarLinks />
      </Container>
    </div>
  );
}
