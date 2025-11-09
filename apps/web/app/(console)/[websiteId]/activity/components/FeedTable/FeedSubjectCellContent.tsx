import { eventSubjectAsIcon, eventSubjectAsText } from "@/lib/eventSubject";
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
    <Grid container spacing={1}>
      <Grid size={2}>
        <Avatar>{eventSubjectAsIcon(subject)}</Avatar>
      </Grid>
      <Grid size={10}>
        <Stack direction="column">
          <Typography sx={{ fontWeight: "800" }}>
            {eventSubjectAsText(subject)}
          </Typography>
          <Typography>{description}</Typography>
        </Stack>
      </Grid>
    </Grid>
  );
}
