import { Type, type Static } from "@fastify/type-provider-typebox";
import {
  FeedEventSchema,
  FeedEventStatusSchema,
  FeedEventTypeSchema,
} from "@feed/types";

export const EventsQuerystringSchema = Type.Object({
  status: Type.Optional(FeedEventStatusSchema),
  type: Type.Optional(FeedEventTypeSchema),
  startDate: Type.Optional(Type.String({ format: "date" })),
  endDate: Type.Optional(Type.String({ format: "date" })),
  page: Type.Optional(Type.Integer()),
  pageSize: Type.Optional(Type.Integer()),
});

export type EventsQuerystring = Static<typeof EventsQuerystringSchema>;

export const PaginationDataSchema = Type.Object({
  page: Type.Integer(),
  pageSize: Type.Integer(),
  total: Type.Integer(),
  nextPage: Type.Optional(Type.Integer()),
});
export type PaginationData = Static<typeof PaginationDataSchema>;

const SuccessEventsReplySchema = Type.Object({
  pagination: PaginationDataSchema,
  events: Type.Array(FeedEventSchema),
});

export const ErrorReplySchema = Type.Object({
  code: Type.Number(),
  reason: Type.String(),
  message: Type.String(),
});

export const EventsReplySchema = {
  200: SuccessEventsReplySchema,
  "4xx": ErrorReplySchema,
  "5xx": ErrorReplySchema,
};

export type EventsReply = Static<typeof EventsReplySchema>;
