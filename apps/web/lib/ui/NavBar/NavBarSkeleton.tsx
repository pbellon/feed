import Container from "@mui/material/Container";
import Skeleton from "@mui/material/Skeleton";

import styles from "./NavBar.module.css";
import NavBarLinks from "./NavBarLinks";

export function NavBarSkeleton() {
  return (
    <div className={styles.navbar}>
      <Container>
        <div className={styles.separatorWrapper}>
          <Skeleton animation="wave" height={40} width={200} />
          <NavBarLinks />
        </div>
      </Container>
    </div>
  );
}
