import { Type, type Static } from "@fastify/type-provider-typebox";
import { EventSchema, EventStatusSchema, EventTypeSchema } from "@feed/types";

export const EventsQuerystringSchema = Type.Object({
  status: Type.Optional(EventStatusSchema),
  type: Type.Optional(EventTypeSchema),
  startDate: Type.Optional(Type.String({ format: "date" })),
  endDate: Type.Optional(Type.String({ format: "date" })),
  page: Type.Optional(Type.Integer()),
  pageSize: Type.Optional(Type.Integer()),
});

export type EventsQuerystring = Static<typeof EventsQuerystringSchema>;

export const PaginationDataSchema = Type.Object({
  page: Type.Integer(),
  pageSize: Type.Integer(),
  Total: Type.Integer(),
  nextPage: Type.Optional(Type.Integer()),
})
export type PaginationData = Static<typeof PaginationDataSchema>;

const SuccessEventsReplySchema = Type.Object({
  pagination: PaginationDataSchema,
  events: Type.Array(EventSchema),
});

const ErrorReplySchema = Type.Object({
  code: Type.Number(),
  reason: Type.String(),
  message: Type.String(),
})

export const EventsReplySchema = Type.Object({
  200: SuccessEventsReplySchema,
  "4xx": ErrorReplySchema,
  "5xx": ErrorReplySchema,
});

export type EventsReply = Static<typeof EventsReplySchema>;
