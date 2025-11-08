import { NavBarSkeleton } from "@/lib/ui/NavBar";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import Container from "@mui/material/Container";

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
