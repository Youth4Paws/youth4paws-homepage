import { boolean, bytea, foreignKey, pgEnum, pgTable, primaryKey, timestamp, uuid, varchar, type AnyPgColumn } from "drizzle-orm/pg-core";
import { Permission } from "../types/permissions";

/**
 * @swagger
 * components:
 *   schemas:
 *     user:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - email
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         name:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         firstName:
 *           type: string
 *           nullable: true
 *         lastName:
 *           type: string
 *           nullable: true
 *         nickname:
 *           type: string
 *           nullable: true
 *         profilePicture:
 *           type: string
 *           format: uuid
 *           nullable: true
 */
export const usersTable = pgTable("users", {
  id: uuid().notNull().primaryKey().defaultRandom(),
  oidcSubject: varchar({ length: 256 }).notNull().unique(),
  name: varchar({ length: 32 }).notNull(),
  email: varchar({ length: 128}).notNull(),
  firstName: varchar({ length: 64 }),
  lastName: varchar({ length: 64 }),
  nickname: varchar({ length: 64 }),
  profilePicture: uuid(),
}, (users) => ({
  fk: foreignKey({
    columns: [users.profilePicture],
    foreignColumns: [filesTable.id],
  }).onUpdate("cascade").onDelete("set null"), // https://github.com/drizzle-team/drizzle-orm/discussions/396
}));

export const permissionEnum = pgEnum('permission', Object.values(Permission) as [string, ...string[]]);

export const permissionsTable = pgTable("permissions", {
  userId: uuid().references(() => usersTable.id, { onDelete: "cascade" }).notNull(),
  permission: permissionEnum("permission").notNull(),
}, (table) => [
  primaryKey({ columns: [table.userId, table.permission] }),
])

/**
 * @swagger
 * components:
 *   schemas:
 *     file:
 *       type: object
 *       required:
 *         - id
 *         - extension
 *         - uploader
 *         - uploadDate
 *         - public
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         extension:
 *           type: string
 *           nullable: true
 *         uploader:
 *           type: string
 *           format: uuid
 *           nullable: true
 *         uploadDate:
 *           type: string
 *           format: date-time
 *         public:
 *           type: boolean
 */
export const filesTable = pgTable("files", {
  id: uuid().notNull().primaryKey().defaultRandom(),
  uploader: uuid().references((): AnyPgColumn => usersTable.id, { onDelete: "set null" }),
  uploadDate: timestamp().notNull().defaultNow(),
  public: boolean().default(true),
  originalName: varchar({ length: 128 }).notNull(),
  extension: varchar({ length: 16 }),
  hash: bytea().notNull(),
  content: bytea().notNull(),
});