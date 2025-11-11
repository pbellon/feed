import Skeleton from "@mui/material/Skeleton";

import styles from "./NavBar.module.css";

export function NavBarSkeleton() {
  return (
    <div className={styles.navbar}>
      <Skeleton animation="wave" height="1.5rem" />
    </div>
  );
}
