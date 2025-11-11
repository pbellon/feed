import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";

import { User } from "@feed/types";

export function FeedUserCellContentSkeleton() {
  return (
    <Grid container spacing={2}>
      <Grid
        size={2}
        sx={{
          display: "flex",
          flexShrink: 0,
          alignItems: "center",
          justifyContent: "right",
        }}
      >
        <Skeleton
          variant="circular"
          sx={{ flexShrink: 0 }}
          animation="wave"
          width={40}
        >
          <Avatar />
        </Skeleton>
      </Grid>
      <Grid size={10} alignItems="center">
        <Typography>
          <Skeleton animation="wave" />
        </Typography>
      </Grid>
    </Grid>
  );
}

export function FeedUserCellContent({ user }: { user: User }) {
  return (
    <Grid container spacing={2} alignItems="center">
      <Grid
        size={2}
        sx={{ display: "flex", alignItems: "center", justifyContent: "right" }}
      >
        <Avatar sx={{ backgroundColor: "#042d48" }}>
          <Person2OutlinedIcon />
        </Avatar>
      </Grid>
      <Grid size={10} alignItems="center">
        <Typography fontWeight="500">{user.fullName}</Typography>
      </Grid>
    </Grid>
  );
}
