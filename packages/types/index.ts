import { type Static, Type } from "typebox";

export const UserSchema = Type.Object({
  id: Type.Integer(),
  fullName: Type.String(),
});
export type User = Static<typeof UserSchema>;

export enum FeedEventTypeEnum {
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
export const FeedEventTypeSchema = Type.Enum(FeedEventTypeEnum);

export enum FeedEventStatusEnum {
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  IN_PROGRESS = "IN_PROGRESS",
}

export const FeedEventStatusSchema = Type.Enum(FeedEventStatusEnum);

export const FeedEventSchema = Type.Object({
  id: Type.Integer(),
  createdAt: Type.String({ format: "date-time" }),
  updatedAt: Type.Optional(Type.String({ format: "date-time" })),
  user: UserSchema,
  status: FeedEventStatusSchema,
});

export type FeedEvent = Static<typeof FeedEventSchema>;

export const WebsiteSchema = Type.Object({
  id: Type.Integer(),
  domain: Type.String({ format: "hostname" }),
});

export type Website = Static<typeof WebsiteSchema>;
