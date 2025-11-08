import { type Static } from "@fastify/type-provider-typebox";
import { ApiErrorReplySchema, FeedEventsReplySchema } from "@feed/types";

/**
 * Schema for the whole responses of feed events schema
 */
export const ApiFeedEventsReplySchema = {
  200: FeedEventsReplySchema,
  "4xx": ApiErrorReplySchema,
  "5xx": ApiErrorReplySchema,
};

export type ApiFeedEventsReply = Static<typeof ApiFeedEventsReplySchema>;
