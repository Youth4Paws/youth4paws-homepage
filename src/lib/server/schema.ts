import { boolean, pgEnum, pgTable, primaryKey, uuid, varchar } from "drizzle-orm/pg-core";
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
 */
export const usersTable = pgTable("users", {
  id: uuid().notNull().primaryKey().defaultRandom(),
  oidcSubject: varchar({ length: 256 }).notNull().unique(),
  name: varchar({ length: 32 }).notNull(),
  email: varchar({ length: 128}).notNull(),
});

export const permissionEnum = pgEnum('permission', Object.values(Permission) as [string, ...string[]]);

export const permissionsTable = pgTable("permissions", {
  userId: uuid().references(() => usersTable.id, { onDelete: "cascade" }).notNull(),
  permission: permissionEnum("permission").notNull(),
}, (table) => [
  primaryKey({ columns: [table.userId, table.permission] }),
])