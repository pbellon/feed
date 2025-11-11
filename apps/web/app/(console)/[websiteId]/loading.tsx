import Container from "@mui/material/Container";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";

import { NavBarSkeleton } from "@/lib/ui/NavBar";

export default function Loading() {
  return (
    <>
      <NavBarSkeleton />
      <main>
        <Container>
          <Typography variant="h2">
            <Skeleton animation="wave" />
          </Typography>
        </Container>
      </main>
    </>
  );
}
