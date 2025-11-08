import { ApiErrorReplySchema, FeedEventsReplySchema } from "@feed/types";

export enum ErrorCode {
  WEBSITE_NOT_FOUND = "WEBSITE_NOT_FOUND",
  INVALID_EVENT_DATE_PARAMS = "INVALID_EVENT_DATE_PARAMS",
}

/**
 * Schema for the whole responses of feed events schema
 */
export const ApiFeedEventsReplySchema = {
  200: FeedEventsReplySchema,
  "4xx": ApiErrorReplySchema,
  "5xx": ApiErrorReplySchema,
};
