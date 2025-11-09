import { EventSubjectIcon, EventSubjectText } from "@/lib/ui/EventSubject";
import { FeedEventSubject } from "@feed/types";
import { Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";

type FeedSubjectCellContentProps = {
  subject: FeedEventSubject;
  description: string;
};
export function FeedSubjectCellContent({
  subject,
  description,
}: FeedSubjectCellContentProps) {
  return (
    <Grid container spacing={2}>
      <Grid
        size={2}
        sx={{ display: "flex", alignItems: "center", justifyContent: "right" }}
      >
        <Avatar>
          <EventSubjectIcon subject={subject} />
        </Avatar>
      </Grid>
      <Grid size={10}>
        <Stack direction="column">
          <Typography sx={{ fontWeight: "800" }}>
            <EventSubjectText subject={subject} />
          </Typography>
          <Typography>{description}</Typography>
        </Stack>
      </Grid>
    </Grid>
  );
}
