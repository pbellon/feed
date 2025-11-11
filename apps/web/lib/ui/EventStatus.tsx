import Chip, { type ChipOwnProps } from "@mui/material/Chip";

import { FeedEventStatus } from "@feed/types";

export function EventStatusText({
  status,
}: {
  status: FeedEventStatus;
}): string {
  switch (status) {
    case FeedEventStatus.COMPLETED:
      return "Success";
    case FeedEventStatus.FAILED:
      return "Error";
    case FeedEventStatus.IN_PROGRESS:
      return "Pending";
  }
}

function chipColor(status: FeedEventStatus): ChipOwnProps["color"] {
  switch (status) {
    case FeedEventStatus.COMPLETED:
      return "success";
    case FeedEventStatus.IN_PROGRESS:
      return "default";
    case FeedEventStatus.FAILED:
      return "error";
  }
}

type EventStatusChipProps = {
  sx?: ChipOwnProps["sx"];
  status: FeedEventStatus;
};

export function EventStatusChip({ status, sx }: EventStatusChipProps) {
  return (
    <Chip
      sx={sx}
      color={chipColor(status)}
      label={<EventStatusText status={status} />}
    />
  );
}
