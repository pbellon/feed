import { FeedEventStatus } from "@feed/types";

export function eventStatusAsText(value: FeedEventStatus): string {
  switch (value) {
    case FeedEventStatus.COMPLETED:
      return "Success";
    case FeedEventStatus.FAILED:
      return "Error";
    case FeedEventStatus.IN_PROGRESS:
      return "In Progress";
  }
}
