import { type Static, Type } from "typebox";

export const UserSchema = Type.Object({
  id: Type.Integer(),
  fullName: Type.String(),
});
export type User = Static<typeof UserSchema>;

export enum FeedEventType {
  ADD = "ADD",
  CREATE = "CREATE",
  DELETE = "DELETE",
  DUPLICATE = "DUPLICATE",
  FLUSH_CACHE = "FLUSH_CACHE",
  INSTALL = "INSTALL",
  OPTIMIZE = "OPTIMIZE",
  PLUG = "PLUG",
  RENEWAL = "RENEWAL",
  TRIGGER = "TRIGGER",
  UNPLUG = "UNPLUG",
  UPDATE = "UPDATE",
  UPLOAD = "UPLOAD",
}
export const FeedEventTypeSchema = Type.Enum(FeedEventType);

export enum FeedEventStatus {
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  IN_PROGRESS = "IN_PROGRESS",
}
export const FeedEventStatusSchema = Type.Enum(FeedEventStatus);

export enum FeedEventSubject {
  APPLICATION = "APPLICATION",
  CACHE = "CACHE",
  CERTIFICATE = "CERTIFICATE",
  CONFIG = "CONFIG",
  DNS = "DNS",
  JOB = "JOB",
  OPTIMIZATION = "OPTIMIZATION",
  PLUG = "PLUG",
  TARGET = "TARGET",
  USER = "USER",
}
export const FeedEventSubjectSchema = Type.Enum(FeedEventSubject);

export const FeedEventSchema = Type.Object({
  id: Type.Integer(),
  createdAt: Type.String({ format: "date-time" }),
  updatedAt: Type.Optional(Type.String({ format: "date-time" })),
  description: Type.String(),
  user: UserSchema,
  status: FeedEventStatusSchema,
  subject: FeedEventSubjectSchema,
  type: FeedEventTypeSchema,
  information: Type.Optional(Type.Any()),
});

export type FeedEvent = Static<typeof FeedEventSchema>;

export const WebsiteSchema = Type.Object({
  id: Type.Integer(),
  domain: Type.String({ format: "hostname" }),
});

export type Website = Static<typeof WebsiteSchema>;

/**
 * Schema of querystring for API feed events endpoint, does not contain
 * filtering by website which will be done by a route parameter
 */
export const FeedEventsQuerySchema = Type.Object({
  status: Type.Optional(FeedEventStatusSchema),
  subject: Type.Optional(FeedEventSubjectSchema),
  startDate: Type.Optional(Type.String({ format: "date" })),
  endDate: Type.Optional(Type.String({ format: "date" })),
  page: Type.Optional(Type.Integer()),
  pageSize: Type.Optional(Type.Integer()),
});
export type FeedEventsQuery = Static<typeof FeedEventsQuerySchema>;

/**
 * Common schema for pagination-specific data for paginated API endpoints
 *
 * @see FeedEventsReplySchema
 */
export const PaginationDataSchema = Type.Object({
  page: Type.Integer(),
  pageSize: Type.Integer(),
  total: Type.Integer(),
  nextPage: Type.Optional(Type.Integer()),
});

export type PaginationData = Static<typeof PaginationDataSchema>;

/**
 * Schema of a response from the feed events API endpoint looks like
 */
export const FeedEventsReplySchema = Type.Object({
  pagination: PaginationDataSchema,
  events: Type.Array(FeedEventSchema),
});

/**
 * Type of a response from the feed events API endpoint looks like
 */
export type FeedEventsReply = Static<typeof FeedEventsReplySchema>;

/**
 * How an error will look like on the server
 */
export const ApiErrorReplySchema = Type.Object({
  code: Type.String(),
  message: Type.String(),
  statusCode: Type.Number(),
});

export type ApiErrorReply = Static<typeof ApiErrorReplySchema>;
