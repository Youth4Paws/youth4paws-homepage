import { boolean, integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 32 }).notNull().unique(),
  email: varchar({ length: 128}).notNull().unique(),
  password: varchar({ length: 256 }).notNull(),
  active: boolean(),
});