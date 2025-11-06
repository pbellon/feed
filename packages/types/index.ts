import { type Static, Type } from 'typebox'

export const UserSchema = Type.Object({
  id: Type.Integer(),
  fullName: Type.String(),
});
export type User = Static<typeof UserSchema>;


export enum EventTypeEnum {
  ADD = 'ADD',
  CREATE = 'CREATE',
  DELETE = 'DELETE',
  DUPLICATE = 'DUPLICATE',
  FLUSH_CACHE = 'FLUSH_CACHE',
  INSTALL = 'INSTALL',
  OPTIMIZE = 'OPTIMIZE',
  PLUG = 'PLUG',
  RENEWAL = 'RENEWAL',
  TRIGGER = 'TRIGGER',
  UNPLUG = 'UNPLUG',
  UPDATE = 'UPDATE',
  UPLOAD = 'UPLOAD',
}
export const EventTypeSchema = Type.Enum(EventTypeEnum);

export enum EventStatusEnum {
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  IN_PROGRESS = 'IN_PROGRESS',
};

export const EventStatusSchema = Type.Enum(EventStatusEnum);

export const EventSchema = Type.Object({
  id: Type.Integer(),
  createdAt: Type.String({ format: "date-time" }),
  updatedAt: Type.Optional(Type.String({ format: "date-time" })),
  user: UserSchema,
  status: EventStatusSchema,
});

export type Event = Static<typeof EventSchema>;
